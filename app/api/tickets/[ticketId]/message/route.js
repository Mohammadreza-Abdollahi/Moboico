import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const decoded = await getUserFromCookie();
    const userId = decoded.id;
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید!" },
        { status: 401 }
      );
    }

    const { ticketId } = params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ message: "تیکت یافت نشد!" }, { status: 404 });
    }

    if (decoded.role === "user") {
      if (ticket.user != userId) {
        return NextResponse.json(
          { message: "تیکت و صاحب تیکت همخوانی ندارد!" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { message: "پیام ها با موفقیت دریافت شدند.", messages: ticket.messages },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در دریافت پیام های تیکت!" },
      { status: 500 }
    );
  }
};
export const POST = async (req, { params }) => {
  try {
    const { ticketId } = params;
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    const { role, id } = decoded;

    const body = await req.json();
    const { message } = body;
    if (!message?.trim()) {
      return NextResponse.json(
        { message: "متن پیام الزامی است!" },
        { status: 400 }
      );
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ message: "تیکت یافت نشد!" }, { status: 404 });
    }
    ticket.messages.push({
      sender: ["user", "admin", "creator"].includes(role) ? role : "user",
      message,
      senderId: new mongoose.Types.ObjectId(id),
    });
    if (ticket.status === "new" && role !== "user") {
      ticket.status = "open";
    } else if (ticket.status === "resolved" || ticket.status === "closed") {
      ticket.status = "open";
    } else if (ticket.status === "pending") {
      ticket.status = "open";
    }

    await ticket.save();

    return NextResponse.json(
      { message: "پیام با موفقیت اضافه شد.", ticket },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در ارسال پیام در تیکت..." },
      { status: 500 }
    );
  }
};

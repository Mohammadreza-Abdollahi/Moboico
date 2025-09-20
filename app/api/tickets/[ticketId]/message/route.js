import { getUserFromCookie } from "@/lib/auth";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    const { ticketId } = params;
    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    const { role } = decoded;

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
    });

    if (ticket.status === "resolved" || ticket.status === "closed") {
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

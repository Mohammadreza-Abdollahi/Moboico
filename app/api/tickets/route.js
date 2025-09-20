import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    const tickets = await Ticket.find({ user: decoded.id });
    if (tickets.length === 0) {
      return NextResponse.json(
        { message: "هیچ تیکتی برای شما وجود ندارد!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در دریافت تیکت ها!" },
      { status: 500 }
    );
  }
};
export const POST = async (req) => {
  try {
    await connectToDatabase();

    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب خود شوید!" },
        { status: 401 }
      );
    }
    const userId = decoded.id;
    const userRole = decoded.role;

    const body = await req.json();
    const { subject, priority, message } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { message: "موضوع و پیام الزامی است." },
        { status: 400 }
      );
    }

    const ticket = await Ticket.create({
      user: userId,
      subject,
      messages: [
        {
          sender: userRole || "user",
          message: message || "سلام",
        },
      ],
      priority: priority || "medium",
      status: "new",
    });
    return NextResponse.json(
      { message: "تیکت  جدید ایجاد شد!", ticket },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "خطا در ایجاد تیکت" }, { status: 500 });
  }
};

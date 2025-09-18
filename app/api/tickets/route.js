import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDatabase();

    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب خود شوید!" },
        { status: 500 }
      );
    }
    const userId = decoded.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد!" }, { status: 404 });
    }

    const { subject, priority, message } = req.body;
    if (!subject || !message) {
      return NextResponse.json(
        { message: "موضوع و پیام الزامی است." },
        { status: 400 }
      );
    }

    const ticket = await Ticket.create({
      user: userId,
      subject,
      message: [
        {
          sender: user.enum || "user",
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

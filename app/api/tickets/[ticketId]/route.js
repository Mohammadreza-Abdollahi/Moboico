import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { ticketId } = params;
    if (!ticketId) {
      return NextResponse.json(
        { message: "شناسه تیکت یافت نشد!" },
        { status: 400 }
      );
    }

    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 400 }
      );
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ message: "تیکت یافت نشد!" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "تیکت با موفقیت دریافت شد.", ticket },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: `خطا در دریافت تیکت با شناسه ${params.ticketId}!` },
      { status: 500 }
    );
  }
};

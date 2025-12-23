import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    if (decoded.role !== "creator" && decoded.role !== "admin") {
      return NextResponse.json(
        { message: "شما دسترسی لازم برای دریافت این اطلاعات را ندارید!" },
        { status: 403 }
      );
    }
    const tickets = await Ticket.find({});
    if (tickets.length === 0) {
      return NextResponse.json(
        { message: "هیچ تیکتی وجود ندارد!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تیکت ها با موفقیت دریافت شدند.", tickets },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در دریافت تیکت ها!" },
      { status: 500 }
    );
  }
};

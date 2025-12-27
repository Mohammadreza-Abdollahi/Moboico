import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export const PATCH = async (req, { s }) => {
  try {
    await connectToDatabase();
    const allowedStatuses = ["new", "open", "pending", "resolved", "closed"];
    const { ticketId } = params;
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    const { role } = decoded;
    if (role !== "creator" && role !== "admin") {
      return NextResponse.json(
        { message: "شما دسترسی لازم برای این عملیات را ندارید!" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { status } = body;
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "وضعیت وارد شده نادرست است!" },
        { status: 400 }
      );
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ message: "تیکت یافت نشد!" }, { status: 404 });
    }
    if (ticket.status === status) {
      return NextResponse.json(
        { message: "وضعیت تیکت هم اکنون همین مورد است!" },
        { status: 400 }
      );
    }
    ticket.status = status;
    await ticket.save();
    return NextResponse.json(
      { message: "وضعیت تیکت با موفقیت تغییر کرد.", ticket },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در تغییر وضعیت تیکت..." },
      { status: 500 }
    );
  }
};

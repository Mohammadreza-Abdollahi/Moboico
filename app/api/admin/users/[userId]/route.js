import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { userId } = params;
    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    if (decoded.role !== "creator") {
      return NextResponse.json(
        { message: "شما دسترسی لازم برای این عمل را ندارید!" },
        { status: 403 }
      );
    }
    const existUser = await User.findById(userId);
    if (!existUser) {
      return NextResponse.json(
        { message: "کاربر وجود ندارد!" },
        { status: 404 }
      );
    }
    await User.findByIdAndDelete(userId);
    return NextResponse.json(
      { message: "کاربر با موفقیت حذف شد." },
      { status: 200 }
    );
  } catch (err) {
    console.log("ERROR====>" + err);
    return NextResponse.json(
      { message: "در حذف کاربر خطایی رخ داده است!" },
      { status: 500 }
    );
  }
};

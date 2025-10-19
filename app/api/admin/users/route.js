import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    if (decoded.role !== "admin" && decoded.role !== "creator") {
      return NextResponse.json(
        { message: "شما دسترسی لازم برای دریافت این اطلاعات را ندارید!" },
        { status: 403 }
      );
    }
    if (decoded.role === "admin") {
      const users = await User.find().select("-password");
      return NextResponse.json(
        {
          message: "کاربران با موفقیت دریافت شدند.",
          users,
        },
        { status: 200 }
      );
    }
    if (decoded.role === "creator") {
      const users = await User.find();
      return NextResponse.json(
        {
          message: "کاربران با موفقیت دریافت شدند.",
          users,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در دریافت لیست کاربران!" },
      { status: 500 }
    );
  }
};

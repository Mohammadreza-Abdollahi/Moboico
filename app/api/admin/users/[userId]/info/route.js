import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { userId } = params;
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 401 }
      );
    }
    if (decoded.role !== "creator" && decoded.role !== "admin") {
      return NextResponse.json(
        { message: "شما دسترسی لازم برای این عمل را ندارید!" },
        { status: 403 }
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "کاربر وجود ندارد!" },
        { status: 404 }
      );
    }
    // Orders 
    return NextResponse.json(
      {
        message: "کاربر با موفقیت دریافت شد.",
        data: {user , addresses: user.addresses}
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("ERROR====>" + err);
    return NextResponse.json(
      { message: "در دریافت کاربر خطایی رخ داده است!" },
      { status: 500 }
    );
  }
};

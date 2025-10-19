import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
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
    if (decoded.role !== "creator" && decoded.role !== "admin") {
      return NextResponse.json(
        { message: "شما دسترسی لازم برای دریافت این اطلاعات را ندارید!" },
        { status: 403 }
      );
    }
    const products = await Product.find({});
    return NextResponse.json(
      { message: "محصولات با موفقیت دریافت شدند.", products },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "در دریافت لیست محصولات مشکلی رخ داده است..." },
      { status: 500 }
    );
  }
};

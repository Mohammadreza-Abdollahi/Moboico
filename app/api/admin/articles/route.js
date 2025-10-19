import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
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
    const articles = await Article.find({});
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "در دریافت مقالات مشکلی رخ داده است...", error },
      { status: 500 }
    );
  }
};

import { connectToDatabase } from "@/lib/mongodb";
import Slide from "@/models/Slide";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const slides = await Slide.find({});
    return NextResponse.json(slides, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "در دریافت اسلاید ها مشکلی رخ داده است...", error },
      { status: 500 }
    );
  }
};

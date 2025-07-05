import { connectToDatabase } from "@/lib/mongodb";
import Tutorial from "@/models/Tutorial";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const tutorials = await Tutorial.find({});
    return NextResponse.json(tutorials, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "در دریافت آموزش ها مشکلی رخ داده است...", error },
      { status: 500 }
    );
  }
}

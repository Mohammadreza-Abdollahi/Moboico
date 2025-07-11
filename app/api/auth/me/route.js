import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromCookie } from "@/lib/auth";

export const GET = async () => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "توکن وجود ندارد!" }, { status: 401 });
    }
    const decoded = getUserFromCookie();
    await connectToDatabase();
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد!" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Error :" + err);
    return NextResponse.json(
      { error: "توکن نامعتبر است یا خطای سرور" },
      { status: 500 }
    );
  }
};

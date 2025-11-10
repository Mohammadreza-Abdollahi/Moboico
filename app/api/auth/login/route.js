import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "شماره همراه و رمز عبور الزامی هستند" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "رمز عبور نادرست" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "کاربر دریافت شد..." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
};

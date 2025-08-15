import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی هستند" },
        { status: 400 }
      );
    } 
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "رمز عبور نادرست" }, { status: 401 });
    }
    const response = NextResponse.json({
      message: "ورود موفقیت‌آمیز بود",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
};

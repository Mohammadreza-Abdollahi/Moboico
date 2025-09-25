const { connectToDatabase } = require("@/lib/mongodb");
const { default: User } = require("@/models/User");
const { NextResponse } = require("next/server");
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export const POST = async (req) => {
  try {
    const { username, email, phone, password } = await req.json();
    if (!username || !email || !phone || !password) {
      return NextResponse.json(
        { error: "وارد کردن همه فیلد ها الزامی است!" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "این ایمیل قبلا ثبت شد است!" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id: uuid(),
      username,
      email,
      phone,
      password: hashedPassword,
    });

    const safeUserData = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };
    return NextResponse.json({
      data: safeUserData,
      message: "کاربر با موفقیت ایجاد شد.",
      success: true,
    });
  } catch (err) {
    console.error("Register API Error:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

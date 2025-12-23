import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const GET = async () => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "توکن وجود ندارد!" }, { status: 401 });
    }
    const decoded = await getUserFromCookie();
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
export const PATCH = async (req) => {
  try {
    const { email, phone, username, password } = await req.json();
    const updateData = { email , phone, username };

    const decoded = await getUserFromCookie();

    await connectToDatabase();
    const user = await User.findById(decoded.id);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "رمز عبور صحیح نیست!" },
        { status: 500 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: user.id },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");    
    if (!updatedUser) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "کاربر با موفقیت ویرایش شد.", data: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error :" + err);
    return NextResponse.json(
      { error: "توکن نامعتبر است یا خطای سرور" },
      { status: 500 }
    );
  }
};

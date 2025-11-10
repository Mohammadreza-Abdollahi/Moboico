import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { redis } from "@/lib/redis";

export const POST = async (req) => {
  try {
    await connectToDatabase();
    const { phone, userOtp } = await req.json();

    if (!phone) {
      return Response.json({ message: "کد وجود ندارد!" }, { status: 404 });
    }
    const storedOtp = await redis.get(`otp:${phone}`);
    if (userOtp != storedOtp) {
      console.log("Stoooored"+storedOtp);
      console.log("UserOtppppp"+userOtp);
      return NextResponse.json(
        {
          message: "کد نادرست است!",
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد!" }, { status: 404 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      id: user._id.toString(),
      username: user.username,
      phone: user.phone,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("3d")
      .sign(secret);

    const response = NextResponse.json({
      message: "ورود موفقیت‌آمیز بود",
      data: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        role: user.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 10,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

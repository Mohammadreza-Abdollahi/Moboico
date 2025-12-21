import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { redis } from "@/lib/redis";
import Otp from "@/models/Otp";

export const POST = async (req) => {
  try {
    await connectToDatabase();
    const { mobile, code } = await req.json();
    const otp = await Otp.findOne({ mobile });

    if (!otp) {
      return Response.json(
        { error: "کد منقضی شده یا وجود ندارد" },
        { status: 400 }
      );
    }

    if (otp.attempts >= 5) {
      await Otp.deleteOne({ mobile });
      return Response.json(
        { error: "تعداد تلاش بیش از حد مجاز" },
        { status: 429 }
      );
    }

    if (otp.expiresAt < new Date()) {
      await Otp.deleteOne({ mobile });
      return Response.json({ error: "کد منقضی شده" }, { status: 400 });
    }

    if (otp.code !== code) {
      await Otp.updateOne({ mobile }, { $inc: { attempts: 1 } });
      return Response.json(
        { error: "کد وارد شده اشتباه است" },
        { status: 400 }
      );
    }
    await Otp.deleteOne({ mobile });
    const user = await User.findOne({ mobile });
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
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

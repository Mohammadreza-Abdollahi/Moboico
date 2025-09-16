import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری خود شوید!" },
        { status: 404 }
      );
    }
    const userId = decoded.id;
    const user = await User.findById(userId).select("addresses");
    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد!" }, { status: 404 });
    }
    return NextResponse.json({ addresses: user.addresses }, { status: 200 });
  } catch (err) {
    console.error("Error fetching addresses:", err);
    return NextResponse.json(
      { message: "خطا در دریافت آدرس‌ها!" },
      { status: 500 }
    );
  }
};
export const POST = async (req) => {
  try {
    await connectToDatabase();
    const {
      userId,
      fullName,
      phone,
      province,
      city,
      postalCode,
      addressLine,
      isDefault,
    } = await req.json();
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد!" }, { status: 404 });
    }
    if (user.addresses.length >= 3) {
      return NextResponse.json(
        {
          message: "شما نمی‌توانید بیشتر از ۳ آدرس داشته باشید!",
        },
        { status: 400 }
      );
    }
    const postalCodeAlreadyExist = user.addresses.some(
      (item) =>
        item.postalCode &&
        postalCode &&
        item.postalCode.toString().trim() === postalCode.toString().trim()
    );
    if (postalCodeAlreadyExist) {
      return NextResponse.json(
        { message: "ادرس هم اکنون وجود دارد!" },
        { status: 400 }
      );
    }
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
    user.addresses.push({
      fullName,
      phone,
      province,
      city,
      postalCode,
      addressLine,
      isDefault,
    });
    await user.save();
    return NextResponse.json(
      { message: "ادرس با موفقیت اضافه شد.", addresses: user.addresses },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در افزودن ادرس ها!" },
      { status: 500 }
    );
  }
};

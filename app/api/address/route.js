import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

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
    const user = User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد!" }, { status: 404 });
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
      { message: "خزای در افزودن ادرس ها!" },
      { status: 500 }
    );
  }
};

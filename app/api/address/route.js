import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  
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
export const PATCH = async (req) => {
  try {
    await connectToDatabase();
    const {
      userId,
      addressId,
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
      return NextResponse.json({ message: "کاربر پیدا نشد!" }, { status: 404 });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return NextResponse.json({ message: "آدرس پیدا نشد!" }, { status: 404 });
    }

    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    address.fullName = fullName;
    address.phone = phone;
    address.province = province;
    address.city = city;
    address.postalCode = postalCode;
    address.addressLine = addressLine;
    address.isDefault = isDefault;

    await user.save();

    return NextResponse.json(
      { message: "آدرس با موفقیت ویرایش شد.", addresses: user.addresses },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "خطا در ویرایش آدرس!" },
      { status: 500 }
    );
  }
};
export const DELETE = async () => {};

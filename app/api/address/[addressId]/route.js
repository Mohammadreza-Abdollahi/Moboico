import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const { addressId } = params;

    const decoded = getUserFromCookie();
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید!" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد!" }, { status: 404 });
    }

    const address = user?.addresses.id(addressId);

    if (!address) {
      return NextResponse.json({ message: "آدرس یافت نشد!" }, { status: 404 });
    }
    return NextResponse.json({ address }, { status: 200 });
  } catch (err) {
    console.error("Get Address Error:", err);
    return NextResponse.json(
      { message: "خطای سرور | دریافت آدرس" },
      { status: 500 }
    );
  }
};
export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();

    const {
      fullName,
      phone,
      province,
      city,
      postalCode,
      addressLine,
      isDefault,
    } = await req.json();

    const { addressId } = params;
    const decoded = getUserFromCookie();
    console.log("decoded >>>", decoded);
    if (!decoded) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید!" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

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
export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();

    const { addressId } = params;
    const user = getUserFromCookie();
    const userId = user.id;

    if (!user) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید!" },
        { status: 401 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { message: "کاربر یا آدرس پیدا نشد!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "آدرس با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "خطای سرور | حذف آدرس" },
      { status: 500 }
    );
  }
};

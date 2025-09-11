import { getUserFromCookie } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
};

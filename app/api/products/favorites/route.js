import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { message: "شناسه کاربر الزامی است!" },
        { status: 400 }
      );
    }
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد!" }, { status: 404 });
    }
    return NextResponse.json({ favorites: user.favorites }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطا در دریافت علاقه‌مندی‌ها" },
      { status: 500 }
    );
  }
};
export const POST = async (req) => {
  try {
    await connectToDatabase();
    const { userId, productId } = await req.json();
    console.log("Useeeer" + userId);
    console.log(productId);
    if (!userId || !productId) {
      return NextResponse.json(
        { message: "شناسه کاربر و شناسه محصول الزامی است!" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "شناسه محصول نا معتبر است!" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "کاربر نا معتبر است!" },
        { status: 400 }
      );
    }

    const isAlreadyFavorite = user.favorites.some(
      (item) => item.toString() === productId
    );
    if (isAlreadyFavorite) {
      user.favorites = user.favorites.filter(
        (favId) => favId.toString() !== productId
      );
      await user.save();
      return NextResponse.json(
        { message: "محصول از علاقه‌مندی‌ها حذف شد", favorites: user.favorites },
        { status: 200 }
      );
    } else {
      user.favorites.push(productId);
      await user.save();
      return NextResponse.json(
        {
          message: "محصول به علاقه‌مندی‌ها اضافه شد",
          favorites: user.favorites,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "خطا در حذف و اضافه کردن علاقه مندی ها!" },
      { status: 500 }
    );
  }
};

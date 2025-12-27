import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

const GET = async (req, { params }) => {
  try {
    const { productId } = params;

    await connectToDatabase();

    if (!productId) {
      return NextResponse.json(
        { message: "شناسه محصول یافت نشد!" },
        { status: 400 }
      );
    }
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد!" }, { status: 404 });
    }
    if (!product.isActive) {
      return NextResponse.json(
        { message: "این محصول در دسترش نیست!" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "محصول با موفقیت دریافت شد.",
        product,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("GET Product Error:" + err);
    return NextResponse.json(
      { message: "در دریافت محصول مشکلی رخ داده است!" },
      { status: 500 }
    );
  }
};

export default GET;

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);

    const skip = (page - 1) * limit;

    const products = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalItems = await Product.countDocuments({ isActive: true });
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error("Get Products Error:", err);
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
};

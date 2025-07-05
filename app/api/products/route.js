import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectToDatabase();
        const products = await Product.find({});
        return NextResponse.json(products,{ status : 200 })
    }catch(error){
        return NextResponse.json({error: "در دریافت محصولات مشکلی رخ داده است...",error},{ status : 500 });
    }
};
import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectToDatabase();
        const articles = await Article.find({});
        return NextResponse.json(articles,{ status : 200 })
    }catch(error){
        return NextResponse.json({error: "در دریافت مقالات مشکلی رخ داده است...",error},{ status : 500 });
    }
};
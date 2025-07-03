import { connectedToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectedToDatabase();
        const articles = await Article.find({});
        return NextResponse.json(articles,{ status : 200 })
    }catch(error){
        return NextResponse.json({error: "In Receive Articles Somthings Wrong...",error},{ status : 500 });
    }
};
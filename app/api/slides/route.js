import { connectedToDatabase } from "@/lib/mongodb";
import Slide from "@/models/Slide";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectedToDatabase();
        const slides = await Slide.find({});
        return NextResponse.json(slides,{ status : 200 })
    }catch(error){
        return NextResponse.json({error: "In Receive Slides Somthings Wrong...",error},{ status : 500 });
    }
};
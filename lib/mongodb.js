import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if(!uri) throw new Error("Database URI is not Found...")

let isConnected = false;
 
export const connectedToDatabase = async ()=>{
    if(isConnected === true) return console.log("Connection Already Established...");
    try{
        await mongoose.connect(uri,{dbName: "moboico"});
        isConnected = true;
        console.log("Connected Successfuly...");
    }catch(error){
        console.error("Connected Failed...");
        console.error(error);
    }
};
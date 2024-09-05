 
import  {getDataFromToken}  from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/models/Admin";
import { NextRequest, NextResponse } from "next/server";
 

export async function GET(request){
     
    await dbConnect();
    try {
        const userId = await getDataFromToken(request);
       
        const user = await AdminModel.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 400});
    }

}
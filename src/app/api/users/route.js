import dns from "dns";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function POST(request){
    dns.setDefaultResultOrder("ipv4first");

    try {

        await connectDB();

        const body = await request.json();



        const user = await User.create(body);


        return NextResponse.json({
            success:true,
            message:"User Saved",
            data:user
        });


    } catch(error){

        return NextResponse.json({
            success:false,
            message:error.message
        });

    }

}
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../../lib/auth";

export async function POST(req: NextRequest){

    try{
        const userID = getUserIdFromRequest(req);

        if(!userID){
            return NextResponse.json(
                {message: "User not found."},
                {status: 401}
            )
        }

        const amount = await req.json();

        if(amount===0 || amount<0){
            return NextResponse.json(
                {message: "Please add a valid amount."},
                {status: 404}
            )
        }

        

    }catch(e){

    }

    


}
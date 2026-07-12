import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../../lib/auth";
import crypto from "crypto";
import { prisma } from "@vortex/db";
import "dotenv/config";
import { computeSignature } from "@vortex/crypto";

export async function POST(req: NextRequest){

    try{
        const userID = getUserIdFromRequest(req);

        if(!userID){
            return NextResponse.json(
                {message: "User not found."},
                {status: 401}
            )
        }

        const body = await req.json();
        const { amount } = body;

        if(amount===0 || amount<0){
            return NextResponse.json(
                {message: "Please add a valid amount."},
                {status: 400}
            )
        }

        const token = crypto.randomBytes(16).toString("hex");

        await prisma.onRampTransaction.create({
            data: {
                token: token,
                status: "Pending",
                amount: amount,
                provider: "Mock-bank",
                userId: userID
            }
        });

        const payload = {
            token,
            amount,
            status: "Success",
        };

        const payloadString = JSON.stringify(payload);

        const secret = process.env.BANK_WEBHOOK_SECRET;

        if(!secret){
            return NextResponse.json(
                {message: "couldn't find the secret key."},
                {status: 500}
            )
        }

        const signature = computeSignature(payloadString, secret);

        const URI = process.env.WEBHOOK_SERVICE_URL;

        if(!URI){
            return NextResponse.json(
                {message: "wrong URI"},
                {status: 500}
            )
        }

        const webhookResponse = await fetch(`${URI}/webhook/onramp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-bank-signature": signature,
            },
            body: payloadString,
        });



        const webhookResult = await webhookResponse.json();

        if (!webhookResponse.ok) {
            return NextResponse.json(
                { message: "Something went wrong", error: webhookResult.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { webhookResult },
            { status: 200 }
        );

    }catch(e){
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        )
    }




}
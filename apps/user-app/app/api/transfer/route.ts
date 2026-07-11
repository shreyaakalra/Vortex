import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../lib/auth";
import { transferSchema } from "../schema";
import { prisma, transferMoney } from "@vortex/db";

export async function POST(req: NextRequest){

    try {
        const fromUserId = getUserIdFromRequest(req);

        if(!fromUserId){
            return NextResponse.json(
                {message: "Unauthorized token"},
                {status: 401}
            )
        }

        const body = await req.json();

        const validated = transferSchema.safeParse(body);

        if(!validated.success){
            return NextResponse.json(
                {
                    message: "Validation Failed",
                    errors: validated.error.flatten().fieldErrors
                },
                {status: 400}
            )
        }

        const {number, amount} = validated.data;

        const toUser = await prisma.user.findUnique({
            where: {
                number: number
            }
        });

        if(!toUser){
            return NextResponse.json(
                {message: "The user you are trying to send money to doesn't exist."},
                {status: 404}
            )
        }

        const toUserId = toUser.id;

        const result = await transferMoney(fromUserId, toUserId, amount);

        if(!result.success){
            return NextResponse.json(
                {
                    message: result.message
                },
                {status: 400}
            )
        }

        return NextResponse.json(
            {message: "Payment Successful", result},
            {status: 201}
        )

    } catch(e){
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }

}
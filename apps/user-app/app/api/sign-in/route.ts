import { prisma } from "@vortex/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function POST(req: NextRequest){
    try{

        const {email, password} = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!existingUser){
            return NextResponse.json(
                {
                    message: "User doesn't exist. Try signing up instead"
                },
                {status: 403}
            )
        }

        const check =  await bcrypt.compare(password, existingUser?.password);

        if(!check){
            return NextResponse.json(
                {message: "wrong credentials"},
                {status: 403}
            )
        }

        const key = process.env.SECRET_KEY;

        if(!key){
            return NextResponse.json(
                {message: "wrong secret key"},
                {status: 403}
            )
        }

        const token = jwt.sign(
            {id: existingUser.id},
            key,
            {expiresIn: "7d"}
        )

        const response = NextResponse.json(
            { message: "user added" },
            { status: 201 }
        )

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, 
        })

        return response;

    } catch(e){
        console.log(e);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}
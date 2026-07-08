import { NextResponse } from 'next/server';
import { userSchema } from "../schema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

import { prisma } from "@vortex/db";


export async function POST(request: Request){
    try{
        const body = await request.json();

        const validated = userSchema.safeParse(body);

        if(!validated.success){
            return NextResponse.json(
                {
                    message: "Validation failed.",
                    errors: validated.error.flatten().fieldErrors
                },
                {status: 400}
            )
        }

        const { name, email, password, number } = validated.data

        const user = await prisma.user.findUnique({
            where: {
                number: number
            }
        })

        if(user){
            return NextResponse.json(
                {
                    message: "User already exists, try logging in instead.",
                },
                {status: 403}
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                number: number,
                password: hashedPass,
                balance: {
                create: {
                    amount: 0,
                    locked: 0
                }
            }
            }
        })

        const key = process.env.SECRET_KEY;

        if(!key){
            return NextResponse.json(
                {message: "secret key is invalid."},
                {status: 403}
            )
        }

        const token = jwt.sign(
            {id: newUser.id},
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

    } catch(error){
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal Server Error"
            },
            {status: 500}
        )
    }
}
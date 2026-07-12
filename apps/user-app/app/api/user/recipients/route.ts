import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../../lib/auth";
import { prisma } from "@vortex/db";

export async function GET(req: NextRequest){

    try{

        const userId = getUserIdFromRequest(req);

        if(!userId){
            return NextResponse.json(
                {message: "User Not Found"},
                {status: 401}
            )   
        }

        const recentLedgers = await prisma.ledger.findMany({

            where: {
                fromUserId: userId,
                type: "P2P"
            },
            distinct: 'toUserId',
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
            include: {
                toUser: {
                    select: {
                        name: true,
                        number: true
                    }
                }
            },
            
        });

        const seen = new Set<string>();

        const recipients = recentLedgers
            .map((l) => ({name: l.toUser?.name, number: l.toUser?.number}))
            .filter((r) => {
                if(!r.number || seen.has(r.number)) return false;
                seen.add(r.number);
                return true;
            })
            .slice(0,10)



        return NextResponse.json(
            {recipients},
            {status: 200}
        );

    } catch(e){
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }

}
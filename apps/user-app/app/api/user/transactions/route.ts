import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../../lib/auth";
import { prisma } from "@vortex/db";

export async function GET(req: NextRequest) {
  try {
    const id = getUserIdFromRequest(req);

    if (!id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const transactions = await prisma.ledger.findMany({
      where: {
        status: "SUCCESS",
        OR: [
            { fromUserId: id },
            { toUserId: id },
        ],
      },
      include: {
        fromUser: {
          select: { name: true },
        },
        toUser: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
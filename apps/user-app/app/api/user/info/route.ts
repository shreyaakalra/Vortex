import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../../lib/auth";
import { prisma } from "@vortex/db";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
      return NextResponse.json(
        { message: "You can't access this page." },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        balance: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User doesnt exist." },
        { status: 404 },
      );
    }

    const { password, ...safeUser } = user;

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

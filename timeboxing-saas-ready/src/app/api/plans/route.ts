import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { title, dayStart, workspaceId, ownerId } = await req.json();
  const plan = await prisma.plan.create({ data: { title, dayStart: new Date(dayStart), workspaceId, ownerId } });
  return NextResponse.json(plan);
}
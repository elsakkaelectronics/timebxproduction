import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const planId = req.nextUrl.searchParams.get("planId");
  const tasks = await prisma.task.findMany({ where: { planId: planId || undefined }, orderBy: { order: "asc" } });
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const { planId, title, minutes, color } = await req.json();
  const task = await prisma.task.create({ data: { planId, title, minutes, color } });
  return NextResponse.json(task);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const task = await prisma.task.update({ where: { id }, data });
  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")!;
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ensureCustomer } from "@/lib/billing";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string;
  const membership = await prisma.membership.findFirst({ where: { userId } });
  if (!membership) return NextResponse.json({ error: "No workspace" }, { status: 400 });
  const customer = await ensureCustomer(membership.workspaceId);
  const portal = await stripe.billingPortal.sessions.create({ customer, return_url: `${process.env.APP_URL}/billing` });
  return NextResponse.json({ url: portal.url });
}
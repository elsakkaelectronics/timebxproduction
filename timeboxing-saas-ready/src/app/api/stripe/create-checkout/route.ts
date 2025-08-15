import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ensureCustomer } from "@/lib/billing";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string;
  const membership = await prisma.membership.findFirst({ where: { userId }, include: { workspace: true } });
  if (!membership) return NextResponse.json({ error: "No workspace" }, { status: 400 });
  const price = (await req.json()).priceId as string;
  const customer = await ensureCustomer(membership.workspaceId);
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer,
    line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.APP_URL}/billing?status=success`,
    cancel_url: `${process.env.APP_URL}/billing?status=cancel`,
  });
  return NextResponse.json({ url: checkout.url });
}
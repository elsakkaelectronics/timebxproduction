import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (e: any) {
    return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as any;
      const workspaceId = sub.metadata?.workspaceId || (await stripe.customers.retrieve(sub.customer as string) as any)?.metadata?.workspaceId;
      if (workspaceId) {
        const plan = sub.status === "active" ? "PRO" : "FREE";
        await prisma.workspace.update({ where: { id: workspaceId }, data: { plan } });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as any;
      const workspaceId = sub.metadata?.workspaceId || (await stripe.customers.retrieve(sub.customer as string) as any)?.metadata?.workspaceId;
      if (workspaceId) {
        await prisma.workspace.update({ where: { id: workspaceId }, data: { plan: "FREE" } });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
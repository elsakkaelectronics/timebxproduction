import { prisma } from "./prisma";
import { stripe } from "./stripe";

export async function ensureCustomer(workspaceId: string) {
  const ws = await prisma.workspace.findUnique({ where: { id: workspaceId } });
  if (!ws) throw new Error("Workspace not found");
  if (ws.stripeId) return ws.stripeId;
  const customer = await stripe.customers.create({ metadata: { workspaceId } });
  await prisma.workspace.update({ where: { id: workspaceId }, data: { stripeId: customer.id } });
  return customer.id;
}
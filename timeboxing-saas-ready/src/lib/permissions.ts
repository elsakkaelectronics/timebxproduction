import { prisma } from "./prisma";

export async function canAccessWorkspace(userId: string, workspaceId: string) {
  const m = await prisma.membership.findUnique({ where: { userId_workspaceId: { userId, workspaceId } } });
  return !!m;
}
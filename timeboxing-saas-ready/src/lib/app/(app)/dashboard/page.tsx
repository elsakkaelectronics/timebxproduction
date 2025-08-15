import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string;
  const membership = await prisma.membership.findFirst({ where: { userId }, include: { workspace: true } });
  const ws = membership?.workspace;
  const plans = ws ? await prisma.plan.findMany({ where: { workspaceId: ws.id }, orderBy: { createdAt: "desc" } }) : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/tasks" className="px-4 py-2 rounded-xl bg-slate-900 text-white">New Plan</Link>
      </div>
      {!ws ? (
        <CreateWorkspace />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {plans.map(p => (
            <div key={p.id} className="rounded-xl border p-4">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm opacity-70">{new Date(p.dayStart).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateWorkspace() {
  return (
    <form action={create} className="rounded-xl border p-4 space-y-3">
      <div className="font-semibold">Create your workspace</div>
      <input name="name" placeholder="Workspace name" className="px-3 py-2 rounded border w-64" />
      <button className="px-3 py-2 rounded bg-slate-900 text-white">Create</button>
    </form>
  );
}

async function create(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "My Workspace");
  const session = await auth();
  const userId = (session?.user as any)?.id as string;
  const ws = await prisma.workspace.create({ data: { name } });
  await prisma.membership.create({ data: { userId, workspaceId: ws.id, role: "OWNER" } });
}
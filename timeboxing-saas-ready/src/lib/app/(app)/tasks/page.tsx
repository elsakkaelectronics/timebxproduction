import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function TasksPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string;
  const membership = await prisma.membership.findFirst({ where: { userId }, include: { workspace: true } });
  if (!membership) return <div className="p-6">Join or create a workspace first.</div>;
  const plan = await prisma.plan.create({ data: { title: "Today's Plan", dayStart: new Date(), workspaceId: membership.workspaceId, ownerId: userId } });
  const tasks = await prisma.task.findMany({ where: { planId: plan.id }, orderBy: { order: "asc" } });
  return <TaskEditor planId={plan.id} tasks={tasks} />;
}

function TaskEditor({ planId, tasks }: { planId: string; tasks: any[] }) {
  return (
    <div className="space-y-3">
      <form action={add.bind(null, planId)} className="flex gap-2">
        <input name="title" placeholder="Task title" className="px-3 py-2 rounded border flex-1" />
        <input type="number" name="minutes" defaultValue={25} className="px-3 py-2 rounded border w-24" />
        <button className="px-3 py-2 rounded bg-slate-900 text-white">Add</button>
      </form>
      <ul className="divide-y">
        {tasks.map(t => (
          <li key={t.id} className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-xs opacity-70">{t.minutes}m</div>
            </div>
            <form action={remove.bind(null, t.id)}>
              <button className="text-red-600">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function add(planId: string, formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "Task");
  const minutes = Number(formData.get("minutes") || 25);
  await prisma.task.create({ data: { title, minutes, planId } });
  revalidatePath("/tasks");
}

async function remove(id: string) {
  "use server";
  await prisma.task.delete({ where: { id } });
  revalidatePath("/tasks");
}
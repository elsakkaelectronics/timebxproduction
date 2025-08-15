import Link from "next/link";

export default function Page() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-bold mb-3">Plan your day in focused blocks</h1>
        <p className="opacity-80 mb-6">Time boxing that actually ships your work. Multi-workspace, collaborative, and synced to your calendar.</p>
        <div className="flex gap-3">
          <Link className="px-4 py-2 rounded-xl bg-slate-900 text-white" href="/api/auth/signin">Get started</Link>
          <Link className="px-4 py-2 rounded-xl border" href="/pricing">See pricing</Link>
        </div>
      </div>
      <div className="rounded-2xl border shadow bg-white p-4">
        <div className="text-sm opacity-70">Live preview mock</div>
        <div className="h-48 rounded-xl bg-slate-100 mt-2" />
      </div>
    </section>
  );
}
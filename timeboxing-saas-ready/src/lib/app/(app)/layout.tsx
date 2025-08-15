import "@/app/globals.css";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    return (
      <html><body className="p-6">Not signed in. <a className="underline" href="/api/auth/signin">Sign in</a></body></html>
    );
  }
  return (
    <html>
      <body className="min-h-screen grid grid-rows-[auto,1fr]">
        <header className="border-b p-4 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold">TimeBox</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/tasks">Tasks</Link>
            <Link href="/billing">Billing</Link>
            <a href="/api/auth/signout">Sign out</a>
          </nav>
        </header>
        <main className="p-4 max-w-6xl mx-auto w-full">{children}</main>
      </body>
    </html>
  );
}
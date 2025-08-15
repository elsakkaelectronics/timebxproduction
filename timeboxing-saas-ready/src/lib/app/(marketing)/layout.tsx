import "@/app/globals.css";
import Link from "next/link";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
        <header className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <Link href="/" className="font-bold">TimeBox</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/pricing">Pricing</Link>
            <Link href="/api/auth/signin">Sign in</Link>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
"use client";
import { useState } from "react";

export default function BillingPage(){
  const [loading, setLoading] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Billing</h1>
      <div className="rounded-xl border p-4">
        <div className="space-x-2">
          <button onClick={async()=>{setLoading("monthly"); const r = await fetch("/api/stripe/create-checkout",{method:"POST", body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY })}); const {url} = await r.json(); location.href=url; }} className="px-4 py-2 rounded bg-slate-900 text-white">Subscribe Monthly</button>
          <button onClick={async()=>{setLoading("annual"); const r = await fetch("/api/stripe/create-checkout",{method:"POST", body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL })}); const {url} = await r.json(); location.href=url; }} className="px-4 py-2 rounded border">Subscribe Annual</button>
        </div>
        <div className="mt-4">
          <button onClick={async()=>{const r = await fetch("/api/stripe/portal",{method:"POST"}); const {url} = await r.json(); location.href=url; }} className="px-4 py-2 rounded border">Open Customer Portal</button>
        </div>
      </div>
    </div>
  );
}
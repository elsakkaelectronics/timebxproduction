export default function Pricing() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <PlanCard name="Free" price="$0" features={["1 workspace", "3 plans/day", "Local export"]} ctaHref="/api/auth/signin" />
      <PlanCard name="Pro" price="$6/mo" features={["Unlimited plans", "Unlimited members", "Calendar sync", "Priority support"]} ctaHref="/billing" highlight />
    </div>
  );
}

function PlanCard({ name, price, features, ctaHref, highlight=false }: { name:string; price:string; features:string[]; ctaHref:string; highlight?:boolean }){
  return (
    <div className={`rounded-2xl border p-6 ${highlight?"border-slate-900 shadow-lg":""}`}>
      <div className="text-sm opacity-70">{name}</div>
      <div className="text-3xl font-bold mt-1">{price}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {features.map(f=> <li key={f}>• {f}</li>)}
      </ul>
      <a href={ctaHref} className="mt-6 inline-block px-4 py-2 rounded-xl bg-slate-900 text-white">{name==="Pro"?"Upgrade":"Get started"}</a>
    </div>
  );
}
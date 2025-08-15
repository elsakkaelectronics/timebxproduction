# Time Boxing SaaS Starter

### Prereqs
- Node 18+
- PostgreSQL
- Stripe account (test mode is fine)

### Setup
1. Copy `.env.example` to `.env.local` and fill values
2. Install deps: `pnpm i` (or `npm i`)
3. Setup DB: `pnpm db:push`
4. Run dev: `pnpm dev` and open http://localhost:3000
5. Configure Stripe webhook: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Deploy (Vercel)
- Set env vars from `.env.example`
- `vercel --prod`

### Notes
- Timer UI is integrated into `/tasks`. Auth + workspaces + Stripe billing included.
# MESSI 10 — Digital Time Capsule

Independent fan tribute for [messi10.co.uk](https://messi10.co.uk).

From a little boy from Rosario to every corner of the planet. The greatest footballer who ever lived. By fans, for fans.

This is not affiliated with Messi, FIFA, Barcelona, Inter Miami, or any representatives.

## What it includes

- Home, Share, Gallery, Rules, Thank-you, Passport, and Admin pages
- Human moderation before anything goes live
- Automatic Messi Passport PNG after approval (name, Tribute ID, date, excerpt, QR, disclaimer)
- Social sharing to X, Facebook, WhatsApp, and the native share sheet
- Mobile-first luxury UI

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Optional. The public Supabase keys already have working fallbacks.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://messi10.co.uk
```

## Moderation

Visit `/admin`, sign in, then approve or reject. Approval issues the next ID (`MESSI-009`, `MESSI-010`, …) and generates the passport. Publication is never automatic.

## Domain

In Vercel, add `messi10.co.uk` and `www.messi10.co.uk` to the project, then point DNS to Vercel.

## Builder credit

Footer credit: [Dev2439](https://github.com/dev2439)

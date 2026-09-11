export const SITE = {
  name: "MESSI 10",
  title: "MESSI 10 — Digital Time Capsule",
  domain: "messi10.co.uk",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://messi10.co.uk",
  tagline: "From a little boy from Rosario to every corner of the planet.",
  subtitle: "The greatest footballer who ever lived. By fans, for fans.",
  disclaimer:
    "This is an independent fan tribute. Not affiliated with Messi, FIFA, Barcelona, Inter Miami, or any representatives.",
  builder: {
    name: "Dev2439",
    url: "https://github.com/dev2439",
  },
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lgwtgmqoxapnryuvoskg.supabase.co",
  supabaseAnonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnd3RnbXFveGFwbnJ5dXZvc2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNjE5NjcsImV4cCI6MjEwMTgzNzk2N30.l8fq938555mziT6fnrOkKGTXgkWEF6tTzZhoe6kJmEg",
} as const;

export const MOMENT_SUGGESTIONS = [
  "World Cup 2022 final",
  "Copa América 2021",
  "The 91st minute against Chelsea",
  "First goal for Barcelona",
  "Last dance at Camp Nou",
  "Olympic gold, Beijing 2008",
  "Six trophies in 2009",
  "Inter Miami nights",
  "Debut for Argentina",
];

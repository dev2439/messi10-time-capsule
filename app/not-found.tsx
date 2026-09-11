import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <p className="kicker">404</p>
      <h1 className="font-serif mt-4 text-5xl">This page has left the pitch.</h1>
      <p className="mt-5 text-[var(--muted)]">The memory you are looking for is not in the capsule.</p>
      <Link href="/" className="btn-gold mt-8 sm:!w-auto">
        Return home
      </Link>
    </div>
  );
}

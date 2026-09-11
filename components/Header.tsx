"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Capsule" },
  { href: "/share", label: "Share" },
  { href: "/gallery", label: "Gallery" },
  { href: "/rules", label: "Rules" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${scrolled || open ? "nav-blur" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-[var(--line)] text-[0.65rem] tracking-[0.2em] text-[var(--gold)]">
            10
          </span>
          <span className="font-serif text-xl tracking-[0.28em]">MESSI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.68rem] tracking-[0.28em] uppercase transition-colors ${
                pathname === link.href ? "text-[var(--gold)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/share" className="btn-gold !py-2.5 !px-4 !w-auto">
            Leave a memory
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-[0.68rem] tracking-[0.28em] uppercase text-[var(--gold)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] px-5 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-[0.22em] uppercase text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/share" className="btn-gold mt-2">
              Leave a memory
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

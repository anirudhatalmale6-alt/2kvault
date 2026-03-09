"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/accounts", label: "Accounts" },
  { href: "/grinding", label: "Grinding" },
  { href: "/middleman", label: "Middleman" },
];

const DISCORD_URL = "https://discord.gg/nuk3NaGrnF";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* ── Detect scroll for navbar shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-vault-lg" : "glass-nav"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* ── Logo + brand ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-1 ring-vault-border group-hover:ring-gold/40 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="2kVault Logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <span className="font-display text-2xl font-semibold tracking-wide text-text-primary group-hover:text-gold transition-colors duration-300">
              2kVault
            </span>
          </Link>

          {/* ── Desktop navigation (center) ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-gold bg-gold/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Discord button (right) ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-gold text-vault-bg font-semibold text-sm rounded-lg hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              {/* Discord SVG icon */}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-45 translate-y-[4px]"
                    : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  mobileOpen
                    ? "-rotate-45 -translate-y-[4px]"
                    : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-vault-bg/90 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div
          className={`relative z-10 bg-vault-bg-light border-t border-vault-border transition-all duration-300 ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="px-4 py-6 space-y-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-gold bg-gold/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                } ${mobileOpen ? "animate-slideUp" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}

            <div
              className={`pt-4 ${mobileOpen ? "animate-slideUp" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-gold text-vault-bg font-semibold text-sm rounded-lg hover:shadow-vault-glow transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

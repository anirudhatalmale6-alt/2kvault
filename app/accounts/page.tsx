"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Types ── */
interface Listing {
  id: string;
  title: string;
  description: string;
  console: string;
  rep_level: string;
  rep_percent: number;
  price: number;
  image_urls: string[];
  status: string;
  seller_name: string;
  seller_discord: string;
  featured: number;
  created_at: string;
}

const DISCORD_URL = "https://discord.gg/nuk3NaGrnF";

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "ID-Verified Sellers",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    label: "Discord Delivery",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "PS5 & Xbox X/S Only",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Money Back Guarantee",
  },
];

const STATS = [
  { value: "100+", label: "Accounts Sold" },
  { value: "4.9/5", label: "Customer Rating" },
  { value: "Fast", label: "Delivery via Discord" },
  { value: "100%", label: "Satisfaction" },
];

const REP_LEVELS = [
  "All",
  "Starter 1", "Starter 2", "Starter 3", "Starter 4", "Starter 5",
  "All-Star 1", "All-Star 2", "All-Star 3", "All-Star 4", "All-Star 5",
  "Veteran 1", "Veteran 2", "Veteran 3", "Veteran 4", "Veteran 5",
  "Legend 1", "Legend 2", "Legend 3", "Legend 4", "Legend 5",
  "Superstar 1", "Superstar 2", "Superstar 3",
];

/* ── Scroll-animation hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ── Console badge color ── */
function consoleBadgeClass(c: string) {
  return c === "PS5"
    ? "bg-blue/20 text-blue-light border border-blue/30"
    : "bg-green/20 text-green-light border border-green/30";
}

export default function AccountsPage() {
  /* ── State ── */
  const [listings, setListings] = useState<Listing[]>([]);
  const [soldListings, setSoldListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [consoleFilter, setConsoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"available" | "sold">("available");
  const [repSearch, setRepSearch] = useState("All");

  const listingsRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-reveal sections ── */
  const heroReveal = useScrollReveal();
  const filterReveal = useScrollReveal();
  const gridReveal = useScrollReveal();
  const crossSellReveal = useScrollReveal();
  const soldReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  /* ── Fetch listings ── */
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("status", statusFilter === "available" ? "approved" : "sold");
      if (consoleFilter !== "All") params.set("console", consoleFilter);
      const res = await fetch(`/api/listings?${params.toString()}`);
      const data = await res.json();
      let filtered = data as Listing[];
      if (repSearch !== "All") {
        filtered = filtered.filter((l) => l.rep_level === repSearch);
      }
      setListings(filtered);
    } catch {
      setListings([]);
    }
    setLoading(false);
  }, [consoleFilter, statusFilter, repSearch]);

  /* ── Fetch sold listings for carousel ── */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/listings?status=sold");
        const data = await res.json();
        setSoldListings(data as Listing[]);
      } catch {
        setSoldListings([]);
      }
    })();
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  /* ── Scroll to listings ── */
  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ── Sold carousel scroll ── */
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = 320;
    carouselRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-vault-bg pt-16">
      {/* ═══════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-hero-mesh">
        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div
          ref={heroReveal.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 transition-all duration-700 ${
            heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── Left column ── */}
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                  <span className="text-text-primary">2kVault&apos;s</span>
                  <br />
                  <span className="text-gradient-gold">Account Vault</span>
                </h1>
                <p className="mt-5 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl">
                  Dominate the court with stacked rosters, maxed builds, and
                  millions in MT &amp; VC. Secure, instant, and guaranteed.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToListings}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-blue text-white font-semibold text-sm rounded-lg hover:shadow-vault-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  Browse Accounts
                </button>
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-gold text-vault-bg font-semibold text-sm rounded-lg btn-glow-gold hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Sell Your Account
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TRUST_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm"
                  >
                    <span className="text-gold shrink-0">{item.icon}</span>
                    <span className="leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column: Logo with overlays ── */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Glow behind logo */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gold/10 rounded-full blur-[80px] animate-glow-pulse" />

              <div className="relative animate-float">
                {/* Main logo */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden ring-2 ring-gold/20 shadow-vault-glow">
                  <Image
                    src="/logo.png"
                    alt="2kVault"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating overlay card: top-right */}
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-8 glass-card-gold px-4 py-3 rounded-xl shadow-vault-lg animate-float-slow">
                  <p className="text-[10px] sm:text-xs text-gold font-semibold uppercase tracking-wider">
                    Exclusive Event
                  </p>
                  <p className="text-sm sm:text-base font-display font-bold text-text-primary">
                    Basketball Godz
                  </p>
                  <p className="text-xs text-text-secondary">30 Wins</p>
                </div>

                {/* Floating overlay card: bottom-left */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 glass-card px-4 py-3 rounded-xl shadow-vault-lg" style={{ animationDelay: "3s" }}>
                  <p className="text-[10px] sm:text-xs text-green-light font-semibold uppercase tracking-wider">
                    VC Balance
                  </p>
                  <p className="text-sm sm:text-base font-display font-bold text-text-primary">
                    5,000,000+
                  </p>
                  <p className="text-xs text-text-secondary">Virtual Currency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SCAM WARNING BANNER
         ═══════════════════════════════════════ */}
      <section className="pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-xl border border-red-500/30 bg-red-500/[0.08] backdrop-blur-sm p-4 sm:p-5">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.05] to-orange-500/[0.05]" />
            <div className="relative flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p className="text-sm text-text-secondary">
                <span className="text-red-400 font-bold">WARNING:</span>{" "}
                <span className="text-red-300 font-semibold">NEVER</span> do a deal without a middleman from our server. All trades must go through our escrow service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FILTER BAR
         ═══════════════════════════════════════ */}
      <section ref={listingsRef} className="scroll-mt-20">
        <div
          ref={filterReveal.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-700 delay-100 ${
            filterReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card p-4 sm:p-6 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Console tabs */}
              <div className="flex items-center gap-1 bg-vault-bg/60 rounded-lg p-1">
                {["All", "PS5", "Xbox Series X/S"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setConsoleFilter(c)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap ${
                      consoleFilter === c
                        ? "bg-gold/15 text-gold shadow-sm"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-1 bg-vault-bg/60 rounded-lg p-1">
                {(["available", "sold"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 capitalize ${
                      statusFilter === s
                        ? "bg-gold/15 text-gold shadow-sm"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    }`}
                  >
                    {s === "available" ? "Available" : "Sold"}
                  </button>
                ))}
              </div>

              {/* Rep level search */}
              <div className="flex-1 min-w-[180px]">
                <select
                  value={repSearch}
                  onChange={(e) => setRepSearch(e.target.value)}
                  className="w-full px-4 py-2.5 bg-vault-bg/80 border border-vault-border rounded-lg text-sm text-text-primary focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  {REP_LEVELS.map((r) => (
                    <option key={r} value={r}>
                      {r === "All" ? "All Rep Levels" : r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LISTINGS GRID
         ═══════════════════════════════════════ */}
      <section>
        <div
          ref={gridReveal.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 transition-all duration-700 delay-200 ${
            gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {loading ? (
            /* Skeleton loader */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card rounded-xl overflow-hidden">
                  <div className="h-48 shimmer" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-20 shimmer rounded" />
                    <div className="h-5 w-3/4 shimmer rounded" />
                    <div className="h-4 w-1/2 shimmer rounded" />
                    <div className="h-10 shimmer rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-vault-bg-card flex items-center justify-center">
                <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-2">
                No Listings Found
              </h3>
              <p className="text-text-secondary max-w-md mx-auto">
                {statusFilter === "available"
                  ? "No accounts available right now. Check back soon or join our Discord for the latest drops!"
                  : "No sold listings match your current filters. Try adjusting your search."}
              </p>
            </div>
          ) : (
            /* Listing cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing, i) => (
                <div
                  key={listing.id}
                  className="glass-card rounded-xl overflow-hidden group relative"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* SOLD overlay */}
                  {listing.status === "sold" && (
                    <div className="absolute inset-0 z-10 bg-vault-bg/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="px-6 py-2 bg-red-600/90 text-white font-display text-2xl font-bold tracking-wider rounded-lg -rotate-12 shadow-vault-lg">
                        SOLD
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-48 bg-vault-bg-card overflow-hidden">
                    {listing.image_urls && listing.image_urls.length > 0 ? (
                      <Image
                        src={listing.image_urls[0]}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* 2K themed placeholder */
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-vault-bg-card to-vault-bg">
                        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-2">
                          <span className="font-display text-2xl font-bold text-gold">2K</span>
                        </div>
                        <span className="text-xs text-text-muted">No Image</span>
                      </div>
                    )}

                    {/* Console badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${consoleBadgeClass(listing.console)}`}>
                        {listing.console}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 space-y-3">
                    {/* Rep level + percent */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded">
                        {listing.rep_level}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {listing.rep_percent}%
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-text-primary leading-snug line-clamp-2">
                      {listing.title}
                    </h3>

                    {/* Price */}
                    <p className="font-display text-2xl font-bold text-gradient-gold">
                      ${listing.price.toFixed(2)}
                    </p>

                    {/* Buy button */}
                    {listing.status !== "sold" && (
                      <a
                        href={DISCORD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-gold text-vault-bg font-semibold text-sm rounded-lg btn-glow-gold hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        Buy on Discord
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CROSS-SELL BANNER
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple/5 via-vault-bg to-blue/5" />
        <div
          ref={crossSellReveal.ref}
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-700 ${
            crossSellReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card-gold p-8 sm:p-12 rounded-2xl text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple/5 rounded-full blur-[50px]" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-gold bg-gold/10 rounded-full mb-4 uppercase tracking-wider">
                Need Account Boosts?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-3">
                Account Grinding Services
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto mb-8 text-lg">
                Let our verified grinders level up your account. Rep, badges,
                builds &mdash; we handle the grind so you can dominate the park.
              </p>
              <Link
                href="/grinding"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-purple text-white font-semibold text-sm rounded-lg hover:shadow-vault-purple transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Explore Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECENTLY SOLD CAROUSEL
         ═══════════════════════════════════════ */}
      {soldListings.length > 0 && (
        <section className="py-16">
          <div
            ref={soldReveal.ref}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
              soldReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header + scroll buttons */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
                  Recently Sold
                </h2>
                <p className="text-text-secondary mt-1">
                  Browse accounts that found new owners
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-vault-border text-text-secondary hover:text-text-primary hover:border-gold/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-vault-border text-text-secondary hover:text-text-primary hover:border-gold/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {soldListings.map((listing) => (
                <div
                  key={listing.id}
                  className="glass-card rounded-xl overflow-hidden flex-shrink-0 w-72 snap-start relative group"
                >
                  {/* SOLD tag */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 bg-red-600/90 text-white text-xs font-bold rounded-md uppercase tracking-wide">
                      Sold
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-40 bg-vault-bg-card">
                    {listing.image_urls && listing.image_urls.length > 0 ? (
                      <Image
                        src={listing.image_urls[0]}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-vault-bg-card to-vault-bg">
                        <span className="font-display text-xl font-bold text-text-muted">2K</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${consoleBadgeClass(listing.console)}`}>
                        {listing.console}
                      </span>
                      <span className="text-xs text-gold font-medium">
                        {listing.rep_level}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-semibold text-text-primary line-clamp-1">
                      {listing.title}
                    </h4>
                    <p className="font-display text-lg font-bold text-text-secondary line-through decoration-1">
                      ${listing.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          STATS ROW
         ═══════════════════════════════════════ */}
      <section className="py-16 border-t border-vault-border">
        <div
          ref={statsReveal.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="glass-card-gold p-6 sm:p-8 rounded-xl text-center"
              >
                <p className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

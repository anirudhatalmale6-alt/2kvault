"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════
   INLINE SVG ICONS
   ═══════════════════════════════════════════ */

function ShieldIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LightningIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function HandshakeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 11.5L17 8l-4.5 1.5L10 7 3.5 11.5" />
      <path d="M3.5 11.5l3 3 3-1 2.5 2.5 3-1 2.5 2.5 3-3" />
      <path d="M2 15l3.5-3.5" />
      <path d="M22 15l-3.5-3.5" />
    </svg>
  );
}

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function VaultIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8v8M8 12h8" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function ClockIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function TrophyIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2" />
      <path d="M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2" />
      <path d="M6 3h12v6a6 6 0 01-12 0V3z" />
      <path d="M9 21h6" />
      <path d="M12 15v6" />
    </svg>
  );
}

function LockIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function UsersIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function ExchangeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16l-4-4 4-4" />
      <path d="M3 12h18" />
      <path d="M17 8l4 4-4 4" />
    </svg>
  );
}


/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const REVIEWS = [
  { quote: "Legit service, got my Legend account same day", name: "Marcus", tag: "Account Purchase" },
  { quote: "Best grinding service out there, fast and safe", name: "DripGod", tag: "Rep Grinding" },
  { quote: "Middleman made the trade smooth, no worries", name: "JayB", tag: "Middleman" },
  { quote: "10/10 would buy again, account was exactly as described", name: "KingCourt", tag: "Account Purchase" },
  { quote: "Super quick delivery and great communication", name: "TreyWay", tag: "Rep Grinding" },
  { quote: "Used the middleman twice now, never had an issue", name: "BallIsLife", tag: "Middleman" },
];

const PROCESS_STEPS = [
  {
    num: 1,
    title: "Buyer Pays MM",
    desc: "Funds go to middleman first \u2014 NOT the seller",
    borderColor: "border-blue",
    numColor: "text-blue",
    bgGlow: "from-blue/5",
  },
  {
    num: 2,
    title: "Seller Delivers",
    desc: "Account, service, or goods are delivered",
    borderColor: "border-purple",
    numColor: "text-purple",
    bgGlow: "from-purple/5",
  },
  {
    num: 3,
    title: "MM Verifies",
    desc: "Middleman confirms delivery is complete",
    borderColor: "border-green",
    numColor: "text-green",
    bgGlow: "from-green/5",
  },
  {
    num: 4,
    title: "Funds Released",
    desc: "All 3 confirm \u2014 seller gets paid",
    borderColor: "border-gold",
    numColor: "text-gold",
    bgGlow: "from-gold/5",
  },
];

const TRUST_BADGES = [
  { icon: <ShieldIcon className="w-8 h-8" />, label: "Safe & Verified", desc: "All accounts hand-checked", color: "text-blue" },
  { icon: <ClockIcon className="w-8 h-8" />, label: "Fast Delivery", desc: "Usually same day", color: "text-gold" },
  { icon: <TrophyIcon className="w-8 h-8" />, label: "5-Star Rated", desc: "Hundreds of reviews", color: "text-gold-light" },
  { icon: <LockIcon className="w-8 h-8" />, label: "Escrow Protected", desc: "Middleman security", color: "text-green" },
  { icon: <UsersIcon className="w-8 h-8" />, label: "Elite Grinders", desc: "Vetted professionals", color: "text-purple" },
  { icon: <ExchangeIcon className="w-8 h-8" />, label: "Trusted Trades", desc: "Transparent fees", color: "text-blue-light" },
];

/* ═══════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
   ═══════════════════════════════════════════ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container and all children with data-reveal
    const revealEls = el.querySelectorAll("[data-reveal]");
    revealEls.forEach((child) => observer.observe(child));
    if (el.hasAttribute("data-reveal")) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ═══════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const heroRef = useScrollReveal();
  const reviewsRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const processRef = useScrollReveal();
  const trustRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="relative overflow-hidden">
      {/* ────────────────────────────────────────
          BACKGROUND EFFECTS
          ──────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial gold glow top-left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[120px]" />
        {/* Radial purple glow top-right */}
        <div className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full bg-purple/[0.03] blur-[120px]" />
        {/* Radial blue glow center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue/[0.02] blur-[150px]" />
      </div>

      {/* ════════════════════════════════════════
          SECTION 1: HERO
          ════════════════════════════════════════ */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust badge pill */}
          <div
            data-reveal
            className="reveal-item inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-gold/20 bg-gold/[0.06] text-gold text-sm font-medium"
          >
            <StarIcon className="w-4 h-4 text-gold" />
            <span>Trusted by Thousands of 2K Players</span>
          </div>

          {/* Headline */}
          <h1
            data-reveal
            className="reveal-item font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
          >
            <span className="text-text-primary">The #1 NBA 2K</span>
            <br />
            <span className="text-gradient-gold">Marketplace</span>
          </h1>

          {/* Subtitle */}
          <p
            data-reveal
            className="reveal-item max-w-2xl mx-auto text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-10"
          >
            Buy premium accounts, get your account grinded by professionals,
            or use our trusted middleman service to trade safely.
          </p>

          {/* CTA buttons */}
          <div
            data-reveal
            className="reveal-item flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {/* Browse Accounts */}
            <Link
              href="/accounts"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue to-purple text-white font-semibold text-sm rounded-xl hover:shadow-vault-purple transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              <ShieldIcon className="w-5 h-5" />
              <span>Browse Accounts</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Get Grinding Services */}
            <Link
              href="/grinding"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold-dark to-gold text-vault-bg font-semibold text-sm rounded-xl hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center btn-glow-gold"
            >
              <LightningIcon className="w-5 h-5" />
              <span>Get Grinding Services</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Middleman Service */}
            <Link
              href="/middleman"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 border border-green/40 text-green font-semibold text-sm rounded-xl bg-green/[0.06] hover:bg-green/[0.12] hover:border-green/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              <HandshakeIcon className="w-5 h-5" />
              <span>Middleman Service</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Hero fade-out gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-vault-bg to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════
          SECTION 2: REVIEWS CAROUSEL
          ════════════════════════════════════════ */}
      <section ref={reviewsRef} className="relative z-10 py-16 md:py-24 overflow-hidden">
        <div
          data-reveal
          className="reveal-item text-center mb-10"
        >
          <p className="inline-flex items-center gap-2 text-gold font-semibold text-sm tracking-widest uppercase">
            <StarIcon className="w-4 h-4" />
            Verified Customer Reviews
          </p>
        </div>

        {/* Carousel row */}
        <div className="relative">
          {/* Left fade mask */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-vault-bg to-transparent z-10 pointer-events-none" />
          {/* Right fade mask */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-vault-bg to-transparent z-10 pointer-events-none" />

          <div className="scroll-container animate-scroll">
            {/* Duplicate the reviews twice for infinite scrolling */}
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] sm:w-[360px] mx-3 glass-card-gold p-6 rounded-xl"
              >
                {/* 5 Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} className="w-4 h-4 text-gold" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-text-primary text-sm leading-relaxed mb-4">
                  &ldquo;{review.quote}&rdquo;
                </p>
                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm font-medium">
                    &mdash; {review.name}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 font-medium">
                    {review.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-gold max-w-4xl mx-auto" />

      {/* ════════════════════════════════════════
          SECTION 3: SERVICES
          ════════════════════════════════════════ */}
      <section ref={servicesRef} className="relative z-10 py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div data-reveal className="reveal-item text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-4">
              Everything You Need
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
              Three premium services under one roof &mdash; all backed by 2kVault&apos;s reputation.
            </p>
          </div>

          {/* 3 Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* Card 1: Premium Accounts */}
            <div
              data-reveal
              className="reveal-item glass-card group flex flex-col p-7 md:p-8 hover:border-blue/30"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-6 group-hover:bg-blue/15 transition-colors duration-300">
                <VaultIcon className="w-7 h-7 text-blue" />
              </div>
              {/* Title */}
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">
                Premium Accounts
              </h3>
              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Hand-verified NBA 2K accounts with elite reps, legend builds,
                and exclusive event rewards. Instant delivery guaranteed.
              </p>
              {/* Bullet points */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "Verified & guaranteed accounts",
                  "PS5 & Xbox Series X/S",
                  "Legend Rep builds",
                  "Event exclusives",
                  "Seller-backed with full info",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <CheckIcon className="w-4 h-4 text-blue flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* CTA */}
              <Link
                href="/accounts"
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue/10 border border-blue/30 text-blue font-semibold text-sm rounded-xl hover:bg-blue/20 hover:border-blue/50 transition-all duration-300 mt-auto"
              >
                Browse Accounts
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>

            {/* Card 2: Account Grinding */}
            <div
              data-reveal
              className="reveal-item glass-card-gold group flex flex-col p-7 md:p-8 hover:border-gold/30"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/15 transition-colors duration-300">
                <LightningIcon className="w-7 h-7 text-gold" />
              </div>
              {/* Title */}
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">
                Account Grinding
              </h3>
              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Keep your own account and let our elite grinders handle the work.
                Rep, badges, specializations, and more.
              </p>
              {/* Bullet points */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "Rep grinding (any tier)",
                  "Badge & specialization unlocks",
                  "Capbreakers & VC farming",
                  "Fast turnaround safe methods",
                  "Live order tracking via chat",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <CheckIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* CTA */}
              <Link
                href="/grinding"
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-dark/20 to-purple/20 border border-gold/30 text-gold font-semibold text-sm rounded-xl hover:from-gold-dark/30 hover:to-purple/30 hover:border-gold/50 transition-all duration-300 mt-auto"
              >
                Get a Quote
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>

            {/* Card 3: Middleman / Transfer */}
            <div
              data-reveal
              className="reveal-item glass-card group flex flex-col p-7 md:p-8 hover:border-green/30"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center mb-6 group-hover:bg-green/15 transition-colors duration-300">
                <HandshakeIcon className="w-7 h-7 text-green" />
              </div>
              {/* Title */}
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">
                Middleman / Transfer
              </h3>
              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Stop getting scammed. Our verified middlemen hold funds in escrow
                until both parties confirm delivery.
              </p>
              {/* Bullet points */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  "Escrow protection for buyers & sellers",
                  "Verified trusted middlemen",
                  "Payment method conversions",
                  "8% flat fee (min $15)",
                  "Full chat support throughout",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <CheckIcon className="w-4 h-4 text-green flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* CTA */}
              <Link
                href="/middleman"
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-green/10 border border-green/30 text-green font-semibold text-sm rounded-xl hover:bg-green/20 hover:border-green/50 transition-all duration-300 mt-auto"
              >
                Find a Middleman
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-gold max-w-4xl mx-auto" />

      {/* ════════════════════════════════════════
          SECTION 4: PROCESS (TRADE WITHOUT FEAR)
          ════════════════════════════════════════ */}
      <section ref={processRef} className="relative z-10 py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div data-reveal className="reveal-item text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-4">
              Trade Without Fear
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
              Our middleman escrow process protects both the buyer and seller
              every step of the way.
            </p>
          </div>

          {/* 4 Step cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-12">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                data-reveal
                className={`reveal-item relative glass-card p-6 md:p-7 border-t-2 ${step.borderColor} text-center`}
              >
                {/* Step number */}
                <div className={`font-display text-5xl font-bold ${step.numColor} opacity-20 mb-2`}>
                  {String(step.num).padStart(2, "0")}
                </div>
                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.desc}
                </p>
                {/* Connector arrow (not on last) */}
                {step.num < 4 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <svg className="w-6 h-6 text-vault-border" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div data-reveal className="reveal-item text-center">
            <Link
              href="/middleman"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-green-dark to-green text-white font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <HandshakeIcon className="w-5 h-5" />
              Use Middleman Service
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-gold max-w-4xl mx-auto" />

      {/* ════════════════════════════════════════
          SECTION 5: TRUST BADGES
          ════════════════════════════════════════ */}
      <section ref={trustRef} className="relative z-10 py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-6">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                data-reveal
                className="reveal-item glass-card flex flex-col items-center text-center p-5 md:p-6 hover:border-vault-border-light"
              >
                <div className={`${badge.color} mb-3`}>{badge.icon}</div>
                <h4 className="text-text-primary text-sm font-semibold mb-1">{badge.label}</h4>
                <p className="text-text-muted text-xs leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-gold max-w-4xl mx-auto" />

      {/* ════════════════════════════════════════
          SECTION 6: FINAL CTA
          ════════════════════════════════════════ */}
      <section ref={ctaRef} className="relative z-10 py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glow behind */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[300px] rounded-full bg-gold/[0.06] blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2
              data-reveal
              className="reveal-item font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-5"
            >
              Ready to Get Started?
            </h2>
            <p
              data-reveal
              className="reveal-item text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Browse accounts, order grinding services, or get protected by our
              middleman &mdash; all in one place.
            </p>

            <div
              data-reveal
              className="reveal-item flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              {/* Browse Accounts */}
              <Link
                href="/accounts"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue to-purple text-white font-semibold text-sm rounded-xl hover:shadow-vault-purple transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center"
              >
                <ShieldIcon className="w-5 h-5" />
                Browse Accounts
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Order Grinding */}
              <Link
                href="/grinding"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold-dark to-gold text-vault-bg font-semibold text-sm rounded-xl hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center btn-glow-gold"
              >
                <LightningIcon className="w-5 h-5" />
                Order Grinding
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Middleman */}
              <Link
                href="/middleman"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-green/40 text-green font-semibold text-sm rounded-xl bg-green/[0.06] hover:bg-green/[0.12] hover:border-green/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center"
              >
                <HandshakeIcon className="w-5 h-5" />
                Middleman
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CSS for scroll-triggered reveal animations ── */}
      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger children inside grids */
        .reveal-item:nth-child(2) { transition-delay: 0.1s; }
        .reveal-item:nth-child(3) { transition-delay: 0.2s; }
        .reveal-item:nth-child(4) { transition-delay: 0.3s; }
        .reveal-item:nth-child(5) { transition-delay: 0.4s; }
        .reveal-item:nth-child(6) { transition-delay: 0.5s; }
      `}</style>
    </div>
  );
}

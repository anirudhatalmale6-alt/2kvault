"use client";

import { useEffect, useRef } from "react";

const DISCORD_URL = "https://discord.gg/aZd29qHXd";

/* ── Scroll reveal hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".reveal-on-scroll").forEach((t, i) => {
      setTimeout(() => {
        (t as HTMLElement).style.opacity = "1";
        (t as HTMLElement).style.transform = "translateY(0)";
      }, i * 80);
    });
  }, []);

  return ref;
}

/* ── SVG Icons ── */
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function SearchCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 21-4.35-4.35" />
      <circle cx="11" cy="11" r="8" />
      <path d="m8 11 2 2 4-4" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="m22 2-11 11" />
    </svg>
  );
}

function UserCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function MessageCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function RepeatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function GemIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ── Data ── */
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Buyer Pays MM",
    desc: "Funds go to middleman first — NOT the seller",
    color: "blue" as const,
    Icon: WalletIcon,
  },
  {
    step: "02",
    title: "Seller Delivers",
    desc: "Account, service, or goods are delivered",
    color: "purple" as const,
    Icon: PackageIcon,
  },
  {
    step: "03",
    title: "MM Verifies",
    desc: "Middleman confirms delivery is complete",
    color: "green" as const,
    Icon: SearchCheckIcon,
  },
  {
    step: "04",
    title: "Funds Released",
    desc: "All 3 confirm — seller gets paid",
    color: "gold" as const,
    Icon: SendIcon,
  },
];

const COVERS = [
  {
    title: "Account Trades",
    desc: "Full account transfers with verified ownership checks",
    Icon: UserCheckIcon,
    color: "gold" as const,
  },
  {
    title: "Service Trades",
    desc: "Grinding, boosting, and other service-based transactions",
    Icon: RepeatIcon,
    color: "purple" as const,
  },
  {
    title: "Cross-Platform Trades",
    desc: "Secure trades across PlayStation, Xbox, and PC",
    Icon: RepeatIcon,
    color: "blue" as const,
  },
  {
    title: "High-Value Items",
    desc: "Extra security protocols for premium transactions",
    Icon: GemIcon,
    color: "green" as const,
  },
];

const PRICING_EXAMPLES = [
  { trade: "$100 trade", fee: "$3", result: "$15 min" },
  { trade: "$200 trade", fee: "$6", result: "$15 min" },
  { trade: "$500 trade", fee: "$15", result: "$15" },
];

const TRUST_ITEMS = [
  {
    text: "Verified middlemen with proven track records",
    Icon: UserCheckIcon,
  },
  {
    text: "Full chat support throughout the process",
    Icon: MessageCircleIcon,
  },
  {
    text: "Payment method conversions available",
    Icon: CreditCardIcon,
  },
  {
    text: "Escrow protection on every trade",
    Icon: LockIcon,
  },
];

/* ── Color maps ── */
const CARD_CLASS: Record<string, string> = {
  gold: "glass-card-gold",
  purple: "glass-card-purple",
  blue: "glass-card-blue",
  green: "glass-card-green",
};

const ICON_BG: Record<string, string> = {
  gold: "bg-gold/10",
  purple: "bg-purple/10",
  blue: "bg-blue/10",
  green: "bg-green/10",
};

const ICON_TEXT: Record<string, string> = {
  gold: "text-gold",
  purple: "text-purple",
  blue: "text-blue",
  green: "text-green",
};

const STEP_NUM: Record<string, string> = {
  gold: "text-gold/60",
  purple: "text-purple/60",
  blue: "text-blue/60",
  green: "text-green/60",
};

/* ── Page ── */
export default function MiddlemanPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* ── Background effects ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-green/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-purple/[0.03] blur-[100px]" />
      </div>

      {/* ════════════════════════════════════════
          HERO
         ════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="transition-all duration-700">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/10 border border-green/20 text-green text-xs font-semibold tracking-wider uppercase mb-6">
              <ShieldIcon className="w-3.5 h-3.5" />
              Trusted Escrow
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
              <span className="text-text-primary">Middleman</span>
              <br />
              <span className="text-gradient-green">Service</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Stop getting scammed. Our verified middlemen hold funds in escrow
              until both parties confirm delivery.
            </p>

            <div className="mt-10">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow-green inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-green to-green-dark text-white font-bold text-sm sm:text-base rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <DiscordIcon className="w-5 h-5" />
                Get a Middleman
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SCAM WARNING BANNER
         ════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-xl border border-red-500/30 bg-red-500/[0.08] backdrop-blur-sm p-5 sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.05] to-orange-500/[0.05]" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-red-400 mb-1">
                  Never Trade Without a Middleman
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <span className="text-red-300 font-semibold">NEVER</span> do a deal without using a middleman from our server.
                  All trades must go through our verified escrow service. If someone asks you to trade directly — <span className="text-red-300 font-semibold">it&apos;s a scam</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-700 text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              How It{" "}
              <span className="text-gradient-green">Works</span>
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
              A simple, secure process that protects both buyer and seller
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {HOW_IT_WORKS.map((item, i) => (
              <div
                key={item.step}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  className={`${CARD_CLASS[item.color]} p-7 h-full flex flex-col items-center text-center relative group`}
                >
                  {/* Step number */}
                  <span
                    className={`absolute top-3 right-4 font-display text-3xl font-bold ${STEP_NUM[item.color]}`}
                  >
                    {item.step}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${ICON_BG[item.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.Icon
                      className={`w-6 h-6 ${ICON_TEXT[item.color]}`}
                    />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Connector arrow (not on last) */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-vault-border to-transparent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-green/30 to-transparent" />

      {/* ════════════════════════════════════════
          WHAT WE COVER
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-700 text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              What We{" "}
              <span className="text-gradient-green">Cover</span>
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
              Our middleman service handles all types of NBA 2K transactions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COVERS.map((item, i) => (
              <div
                key={item.title}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  className={`${CARD_CLASS[item.color]} p-7 h-full flex flex-col items-center text-center group`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${ICON_BG[item.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.Icon
                      className={`w-6 h-6 ${ICON_TEXT[item.color]}`}
                    />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRICING
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-700">
            <div className="glass-card-green p-8 sm:p-10 text-center">
              {/* Pricing headline */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/10 border border-green/20 text-green text-xs font-semibold tracking-wider uppercase mb-6">
                Simple Pricing
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
                <span className="text-gradient-green">3%</span>{" "}
                <span className="text-text-primary">Flat Fee</span>
              </h2>
              <p className="text-text-secondary text-base sm:text-lg mb-8">
                Minimum $15 per transaction
              </p>

              {/* Examples table */}
              <div className="max-w-md mx-auto space-y-3">
                {/* Header */}
                <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-text-muted uppercase tracking-wider pb-2 border-b border-vault-border">
                  <span>Trade Value</span>
                  <span>3% Fee</span>
                  <span>You Pay</span>
                </div>

                {PRICING_EXAMPLES.map((ex) => (
                  <div
                    key={ex.trade}
                    className="grid grid-cols-3 gap-4 items-center p-3 rounded-lg bg-white/[0.02] border border-vault-border/50 hover:border-green/20 transition-colors duration-300"
                  >
                    <span className="text-sm text-text-secondary">
                      {ex.trade}
                    </span>
                    <span className="text-sm text-text-muted">{ex.fee}</span>
                    <span className="text-sm font-semibold text-green">
                      {ex.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRUST & SAFETY
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-700 text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Trust &{" "}
              <span className="text-gradient-green">Safety</span>
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
              Your security is our top priority
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item.text}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="glass-card-green p-6 text-center h-full flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.Icon className="w-5 h-5 text-green" />
                  </div>
                  <p className="text-sm font-medium text-text-primary leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-green/30 to-transparent" />

      {/* ════════════════════════════════════════
          BOTTOM CTA
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="transition-all duration-700">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-4">
              Trade With{" "}
              <span className="text-gradient-green">Confidence</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-10">
              Join our Discord and request a middleman for your next trade.
              Never get scammed again.
            </p>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow-green inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-green to-green-dark text-white font-bold text-base rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <DiscordIcon className="w-5 h-5" />
              Get a Middleman
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

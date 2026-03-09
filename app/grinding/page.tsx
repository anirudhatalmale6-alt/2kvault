"use client";

import { useEffect, useRef } from "react";

const DISCORD_URL = "https://discord.gg/aZd29qHXd";

/* ── Scroll reveal hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reveal all elements immediately on mount
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
function TrophyIcon({ className }: { className?: string }) {
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
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
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
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function DollarIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
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

function TicketIcon({ className }: { className?: string }) {
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
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
    </svg>
  );
}

function GamepadIcon({ className }: { className?: string }) {
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
      <line x1="6" y1="11" x2="10" y2="11" />
      <line x1="8" y1="9" x2="8" y2="13" />
      <line x1="15" y1="12" x2="15.01" y2="12" />
      <line x1="18" y1="10" x2="18.01" y2="10" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
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
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

/* ── Data ── */
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Open a Ticket",
    desc: "Join our Discord and open a grinding ticket",
    color: "blue" as const,
    Icon: TicketIcon,
  },
  {
    step: "02",
    title: "Share Details",
    desc: "Tell us your account info and what you need done",
    color: "purple" as const,
    Icon: MessageIcon,
  },
  {
    step: "03",
    title: "We Grind, You Play",
    desc: "Sit back while our elite team handles it",
    color: "gold" as const,
    Icon: GamepadIcon,
  },
];

const SERVICES = [
  {
    title: "Rep Grinding",
    desc: "Level up your rep from any tier. Starter to Legend, we've got you.",
    color: "gold" as const,
    Icon: TrophyIcon,
    tiers: [
      { label: "Starter to All-Star", price: "$25 - $50" },
      { label: "All-Star to Veteran", price: "$50 - $100" },
      { label: "Veteran to Legend", price: "$100 - $200" },
    ],
    note: "Prices vary based on current level and target",
  },
  {
    title: "Badge Unlocking",
    desc: "Unlock any badge or specialization for your build.",
    color: "purple" as const,
    Icon: StarIcon,
    features: ["All badge types", "Fast completion", "Safe methods"],
    price: "Starting at $15/badge",
  },
  {
    title: "VC Farming",
    desc: "Need VC? Our grinders will farm it for you efficiently.",
    color: "blue" as const,
    Icon: DollarIcon,
    tiers: [
      { label: "100K VC", price: "$10" },
      { label: "500K VC", price: "$40" },
      { label: "1M VC", price: "$70" },
    ],
  },
];

const GUARANTEES = [
  { text: "Safe methods only", Icon: ShieldCheckIcon },
  { text: "No bans, guaranteed", Icon: CheckCircleIcon },
  { text: "Live progress updates", Icon: EyeIcon },
  { text: "Money back guarantee", Icon: RefreshIcon },
];

/* ── Color maps ── */
const CARD_CLASS: Record<string, string> = {
  gold: "glass-card-gold",
  purple: "glass-card-purple",
  blue: "glass-card-blue",
};

const ICON_BG: Record<string, string> = {
  gold: "bg-gold/10",
  purple: "bg-purple/10",
  blue: "bg-blue/10",
};

const ICON_TEXT: Record<string, string> = {
  gold: "text-gold",
  purple: "text-purple",
  blue: "text-blue",
};

const STEP_BORDER: Record<string, string> = {
  gold: "border-gold/30",
  purple: "border-purple/30",
  blue: "border-blue/30",
};

const STEP_NUM: Record<string, string> = {
  gold: "text-gold/60",
  purple: "text-purple/60",
  blue: "text-blue/60",
};

const BADGE_BG: Record<string, string> = {
  gold: "bg-gold/10 text-gold",
  purple: "bg-purple/10 text-purple",
  blue: "bg-blue/10 text-blue",
};

/* ── Page ── */
export default function GrindingPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* ── Background effects ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue/[0.03] blur-[100px]" />
      </div>

      {/* ════════════════════════════════════════
          HERO
         ════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="transition-all duration-700">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
              <GamepadIcon className="w-3.5 h-3.5" />
              Elite Service
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
              <span className="text-text-primary">Account</span>
              <br />
              <span className="text-gradient-gold-purple">Grinding</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Keep your own account and let our elite grinders handle the work.
              Rep, badges, specializations, and more &mdash; all done safely and
              efficiently.
            </p>

            <div className="mt-10">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow-gold inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-gold text-vault-bg font-bold text-sm sm:text-base rounded-xl hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <DiscordIcon className="w-5 h-5" />
                Order via Discord
              </a>
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
              <span className="text-gradient-gold">Works</span>
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
              Three simple steps to get your account grinding started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <div
                key={item.step}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className={`${CARD_CLASS[item.color]} p-8 h-full flex flex-col items-center text-center relative group`}
                >
                  {/* Step number */}
                  <span
                    className={`absolute top-4 right-5 font-display text-4xl font-bold ${STEP_NUM[item.color]}`}
                  >
                    {item.step}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${ICON_BG[item.color]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.Icon className={`w-7 h-7 ${ICON_TEXT[item.color]}`} />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Connector line (not on last) */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 w-8 lg:w-10 h-px bg-gradient-to-r from-vault-border to-transparent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-gold max-w-4xl mx-auto" />

      {/* ════════════════════════════════════════
          SERVICES GRID
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-700 text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Our{" "}
              <span className="text-gradient-gold-purple">Services</span>
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
              Premium grinding services for every aspect of your 2K journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className={`${CARD_CLASS[svc.color]} p-8 h-full flex flex-col group`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${ICON_BG[svc.color]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <svc.Icon className={`w-6 h-6 ${ICON_TEXT[svc.color]}`} />
                  </div>

                  {/* Title & desc */}
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  {/* Tiers (rep / vc) */}
                  {"tiers" in svc && svc.tiers && (
                    <div className="space-y-3 mb-4 flex-1">
                      {svc.tiers.map((tier) => (
                        <div
                          key={tier.label}
                          className={`flex items-center justify-between p-3 rounded-lg border ${STEP_BORDER[svc.color]} bg-white/[0.02]`}
                        >
                          <span className="text-sm text-text-secondary">
                            {tier.label}
                          </span>
                          <span
                            className={`text-sm font-semibold ${ICON_TEXT[svc.color]}`}
                          >
                            {tier.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features (badges) */}
                  {"features" in svc && svc.features && (
                    <div className="space-y-2.5 mb-4 flex-1">
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5">
                          <CheckCircleIcon
                            className={`w-4 h-4 shrink-0 ${ICON_TEXT[svc.color]}`}
                          />
                          <span className="text-sm text-text-secondary">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price note */}
                  {"price" in svc && svc.price && (
                    <div className="mt-auto pt-4">
                      <span
                        className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${BADGE_BG[svc.color]}`}
                      >
                        {svc.price}
                      </span>
                    </div>
                  )}

                  {"note" in svc && svc.note && (
                    <p className="mt-auto pt-4 text-xs text-text-muted italic">
                      {svc.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GUARANTEES
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-700 text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Our{" "}
              <span className="text-gradient-gold">Guarantees</span>
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
              We take your account security seriously
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map((g, i) => (
              <div
                key={g.text}
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="glass-card-gold p-6 text-center h-full flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <g.Icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">
                    {g.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-gold max-w-4xl mx-auto" />

      {/* ════════════════════════════════════════
          BOTTOM CTA
         ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="transition-all duration-700">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-4">
              Ready to{" "}
              <span className="text-gradient-gold-purple">Level Up?</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-10">
              Join our Discord, open a ticket, and let our elite grinders take
              your account to the next level.
            </p>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow-gold inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-gold text-vault-bg font-bold text-base rounded-xl hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <DiscordIcon className="w-5 h-5" />
              Join Discord & Order
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

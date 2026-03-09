import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/accounts", label: "Accounts" },
  { href: "/grinding", label: "Grinding" },
  { href: "/middleman", label: "Middleman" },
];

const DISCORD_URL = "https://discord.gg/aZd29qHXd";

export default function Footer() {
  return (
    <footer className="relative bg-vault-bg border-t border-vault-border">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main footer grid ── */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-vault-border group-hover:ring-gold/40 transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="2kVault Logo"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
              <span className="font-display text-xl font-semibold tracking-wide text-text-primary group-hover:text-gold transition-colors duration-300">
                2kVault
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              The #1 NBA 2K Marketplace. Buy and sell accounts, grinding
              services, and use our trusted middleman for secure transactions.
            </p>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-vault-border group-hover:bg-gold transition-colors duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community column */}
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary mb-4 tracking-wide">
              Community
            </h3>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Join our Discord for the latest listings, giveaways, and support.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-vault-bg-card border border-vault-border rounded-lg text-sm font-medium text-text-primary hover:border-gold/40 hover:text-gold hover:shadow-vault-gold transition-all duration-300 group"
            >
              <svg
                className="w-4 h-4 text-text-secondary group-hover:text-gold transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 border-t border-vault-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            &copy; 2026 2kVault. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Not affiliated with or endorsed by 2K Games or the NBA.
          </p>
        </div>
      </div>
    </footer>
  );
}

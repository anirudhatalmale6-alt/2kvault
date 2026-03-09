import type { Metadata } from "next";
import { Teko, DM_Sans } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const teko = Teko({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-teko",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "2kVault \u2014 The #1 NBA 2K Marketplace",
  description:
    "Buy and sell NBA 2K accounts, grinding services, and use our trusted middleman. The most trusted NBA 2K marketplace with verified sellers and secure transactions.",
  keywords: [
    "NBA 2K",
    "2K marketplace",
    "NBA 2K accounts",
    "2K grinding",
    "NBA 2K middleman",
    "buy 2K account",
    "sell 2K account",
    "2kVault",
  ],
  openGraph: {
    title: "2kVault \u2014 The #1 NBA 2K Marketplace",
    description:
      "Buy and sell NBA 2K accounts, grinding services, and use our trusted middleman.",
    type: "website",
    siteName: "2kVault",
  },
  twitter: {
    card: "summary_large_image",
    title: "2kVault \u2014 The #1 NBA 2K Marketplace",
    description:
      "Buy and sell NBA 2K accounts, grinding services, and use our trusted middleman.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${teko.variable} ${dmSans.variable} font-body antialiased bg-vault-bg text-text-primary`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

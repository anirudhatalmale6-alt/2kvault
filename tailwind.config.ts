import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── core vault palette ── */
        vault: {
          bg: "#060a13",
          "bg-light": "#0c1220",
          "bg-card": "#0f1629",
          "bg-card-hover": "#141d35",
          border: "#1e293b",
          "border-light": "#334155",
        },
        gold: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
          dim: "#92400e",
        },
        purple: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#7c3aed",
        },
        blue: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#2563eb",
        },
        green: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
      },

      fontFamily: {
        display: ["var(--font-teko)", "Teko", "sans-serif"],
        body: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
      },

      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #f59e0b, #d97706)",
        "gradient-purple": "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        "gradient-blue": "linear-gradient(135deg, #3b82f6, #2563eb)",
        "gradient-gold-purple": "linear-gradient(135deg, #f59e0b, #8b5cf6)",
        "gradient-radial-gold":
          "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.15) 0%, transparent 60%)",
        "gradient-radial-purple":
          "radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.10) 0%, transparent 50%)",
        "hero-mesh":
          "radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 50%)",
      },

      boxShadow: {
        "vault-sm": "0 1px 3px rgba(0,0,0,0.4)",
        vault: "0 4px 14px rgba(0,0,0,0.5)",
        "vault-lg": "0 10px 40px rgba(0,0,0,0.6)",
        "vault-gold": "0 0 20px rgba(245,158,11,0.15)",
        "vault-purple": "0 0 20px rgba(139,92,246,0.15)",
        "vault-glow": "0 0 30px rgba(245,158,11,0.25)",
      },

      animation: {
        scroll: "scroll 40s linear infinite",
        "scroll-reverse": "scroll-reverse 45s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideUp: "slideUp 0.6s ease-out forwards",
        slideDown: "slideDown 0.4s ease-out forwards",
        slideInLeft: "slideInLeft 0.5s ease-out forwards",
        slideInRight: "slideInRight 0.5s ease-out forwards",
        scaleIn: "scaleIn 0.4s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },

      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(245,158,11,0.2)" },
          "100%": { boxShadow: "0 0 25px rgba(245,158,11,0.4)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      borderRadius: {
        vault: "12px",
        "vault-lg": "16px",
      },

      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "120": "30rem",
      },
    },
  },
  plugins: [],
};

export default config;

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* If already authenticated, redirect to dashboard */
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Check your credentials.");
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_username", data.username);
      router.replace("/admin");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-vault-bg px-4">
      {/* Subtle radial glow behind card */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Glass card */}
        <div className="glass-card p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-xl overflow-hidden ring-1 ring-vault-border mb-4">
              <Image
                src="/logo.png"
                alt="2kVault Logo"
                width={64}
                height={64}
                className="object-cover"
                priority
              />
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-wide text-gradient-gold">
              Admin Login
            </h1>
            <p className="text-text-muted text-sm mt-1">
              2kVault Management Console
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center animate-slideDown">
              {error}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-vault-bg border border-vault-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-vault-bg border border-vault-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                placeholder="Enter password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-gold text-vault-bg font-semibold text-sm btn-glow-gold hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center text-text-muted text-xs mt-6">
          Protected area. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}

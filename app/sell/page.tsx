"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const DISCORD_URL = "https://discord.gg/nuk3NaGrnF";

const CONSOLE_OPTIONS = ["PS5", "Xbox Series X/S"];

const REP_LEVELS = [
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

/* ── File preview type ── */
interface PreviewFile {
  file: File;
  preview: string;
}

export default function SellPage() {
  /* ── Form state ── */
  const [sellerName, setSellerName] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [email, setEmail] = useState("");
  const [consoleVal, setConsoleVal] = useState("");
  const [repLevel, setRepLevel] = useState("");
  const [repPercent, setRepPercent] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<PreviewFile[]>([]);

  /* ── Submission state ── */
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Scroll reveal ── */
  const heroReveal = useScrollReveal();
  const formReveal = useScrollReveal();

  /* ── Handle file selection ── */
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles: PreviewFile[] = [];
    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      if (file.type.startsWith("image/")) {
        newFiles.push({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);

    // Reset input so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  /* ── Remove a preview ── */
  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  /* ── Cleanup preview URLs ── */
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Submit handler ── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // 1. Upload images
      const imageUrls: string[] = [];
      for (const pf of files) {
        const fd = new FormData();
        fd.append("file", pf.file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error || "Image upload failed");
        }
        const { url } = await uploadRes.json();
        imageUrls.push(url);
      }

      // 2. Create listing
      // Build a title from rep level + console
      const title = `${repLevel} ${consoleVal} Account`;

      const body = {
        title,
        description,
        console: consoleVal,
        rep_level: repLevel,
        rep_percent: Number(repPercent) || 0,
        price: Number(price) || 0,
        image_urls: imageUrls,
        seller_name: sellerName,
        seller_discord: discordUsername,
        seller_email: email || undefined,
      };

      const listingRes = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!listingRes.ok) {
        const errData = await listingRes.json();
        throw new Error(errData.error || "Failed to create listing");
      }

      setSuccess(true);

      // Clear form
      setSellerName("");
      setDiscordUsername("");
      setEmail("");
      setConsoleVal("");
      setRepLevel("");
      setRepPercent("");
      setPrice("");
      setDescription("");
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Shared input classes ── */
  const inputCls =
    "w-full px-4 py-3 bg-vault-bg/80 border border-vault-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300";
  const labelCls = "block text-sm font-medium text-text-secondary mb-1.5";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  /* ── Select arrow background ── */
  const selectArrow = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 12px center",
  };

  return (
    <div className="min-h-screen bg-vault-bg pt-16">
      {/* ═══════════════════════════════════════
          HERO
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-hero-mesh">
        {/* Decorative orbs */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-purple/5 rounded-full blur-[80px] pointer-events-none" />

        <div
          ref={heroReveal.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center transition-all duration-700 ${
            heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-5">
            <span className="text-text-primary">Sell Your</span>{" "}
            <span className="text-gradient-gold">Account</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            List your NBA 2K account on 2kVault and reach thousands of buyers.
            Fast review, secure process, maximum exposure.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FORM
         ═══════════════════════════════════════ */}
      <section className="pb-20">
        <div
          ref={formReveal.ref}
          className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 transition-all duration-700 delay-200 ${
            formReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* ── Success message ── */}
          {success ? (
            <div className="glass-card-gold p-8 sm:p-12 rounded-2xl text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display text-3xl font-bold text-text-primary mb-3">
                Listing Submitted!
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
                Your listing has been submitted for review! We&apos;ll notify you
                on Discord once it&apos;s approved.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-vault-bg font-semibold text-sm rounded-lg btn-glow-gold hover:shadow-vault-glow transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join Discord
                </a>
                <Link
                  href="/accounts"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-vault-border text-text-primary font-semibold text-sm rounded-lg hover:border-gold/40 hover:text-gold transition-all duration-300"
                >
                  Browse Accounts
                </Link>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-sm text-text-muted hover:text-gold transition-colors duration-300"
              >
                Submit another listing
              </button>
            </div>
          ) : (
            /* ── Form card ── */
            <form onSubmit={handleSubmit} className="glass-card-gold p-6 sm:p-10 rounded-2xl space-y-6">
              {/* Section header */}
              <div className="pb-4 border-b border-vault-border/50">
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  Listing Details
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Fill in the details below to list your account
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* ── Row: Seller Name + Discord ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sellerName" className={labelCls}>
                    Seller Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="sellerName"
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="Your display name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="discord" className={labelCls}>
                    Discord Username <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="discord"
                    type="text"
                    required
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    placeholder="username#0000"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* ── Email ── */}
              <div>
                <label htmlFor="email" className={labelCls}>
                  Email <span className="text-text-muted">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputCls}
                />
              </div>

              {/* ── Row: Console + Rep Level ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="console" className={labelCls}>
                    Console <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="console"
                    required
                    value={consoleVal}
                    onChange={(e) => setConsoleVal(e.target.value)}
                    className={selectCls}
                    style={selectArrow}
                  >
                    <option value="" disabled>
                      Select console
                    </option>
                    {CONSOLE_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="repLevel" className={labelCls}>
                    Rep Level <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="repLevel"
                    required
                    value={repLevel}
                    onChange={(e) => setRepLevel(e.target.value)}
                    className={selectCls}
                    style={selectArrow}
                  >
                    <option value="" disabled>
                      Select rep level
                    </option>
                    {REP_LEVELS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ── Row: Rep Percent + Price ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="repPercent" className={labelCls}>
                    Rep Percentage <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="repPercent"
                      type="number"
                      required
                      min={0}
                      max={100}
                      value={repPercent}
                      onChange={(e) =>
                        setRepPercent(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      placeholder="0 - 100"
                      className={inputCls}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="price" className={labelCls}>
                    Asking Price <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                      $
                    </span>
                    <input
                      id="price"
                      type="number"
                      required
                      min={1}
                      step="0.01"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      placeholder="0.00"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>
              </div>

              {/* ── Description ── */}
              <div>
                <label htmlFor="description" className={labelCls}>
                  Account Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your account: builds, badges, VC, win record, anything that makes it stand out..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* ── Screenshots ── */}
              <div>
                <label className={labelCls}>Screenshots</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative border-2 border-dashed border-vault-border hover:border-gold/40 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-vault-bg-card flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                    <svg className="w-6 h-6 text-text-muted group-hover:text-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-secondary">
                    <span className="text-gold font-medium">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    PNG, JPG, WebP or GIF (max 10MB each)
                  </p>
                </div>

                {/* Preview thumbnails */}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {files.map((pf, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded-lg overflow-hidden ring-1 ring-vault-border group"
                      >
                        <Image
                          src={pf.preview}
                          alt={`Preview ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(i);
                          }}
                          className="absolute inset-0 bg-vault-bg/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
                        >
                          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Divider ── */}
              <div className="divider-gold" />

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={submitting}
                className={`flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-gold text-vault-bg font-semibold text-base rounded-xl btn-glow-gold transition-all duration-300 ${
                  submitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-vault-glow hover:scale-[1.01] active:scale-[0.99]"
                }`}
              >
                {submitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Submit Listing
                  </>
                )}
              </button>

              <p className="text-xs text-text-muted text-center">
                By submitting, you agree to our listing terms. All accounts are
                reviewed before going live.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

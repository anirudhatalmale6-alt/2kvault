"use client";

import { useState, useEffect, useCallback, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────────────────────── */

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
  seller_email: string;
  featured: number;
  created_at: string;
  updated_at: string;
}

interface Review {
  id: number;
  name: string;
  text: string;
  service: string;
  rating: number;
}

type Tab = "dashboard" | "listings" | "add" | "reviews";
type StatusFilter = "all" | "pending" | "approved" | "sold" | "rejected";

/* ──────────────────────────────────────────────────────────────────────────────
   Toast notification
   ────────────────────────────────────────────────────────────────────────────── */

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

let toastId = 0;

/* ──────────────────────────────────────────────────────────────────────────────
   Admin Dashboard
   ────────────────────────────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ── Toast helpers ── */
  const addToast = useCallback(
    (message: string, type: "success" | "error") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  /* ── Auth check ── */
  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.replace("/admin/login");
      return;
    }
    setToken(t);
  }, [router]);

  /* ── Fetch data ── */
  const fetchListings = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/listings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch {
      addToast("Failed to load listings", "error");
    }
  }, [token, addToast]);

  const fetchReviews = useCallback(async () => {
    if (!token) return;
    try {
      await fetch("/api/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      /* silent */
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchListings().finally(() => setLoading(false));
    fetchReviews();
  }, [token, fetchListings, fetchReviews]);

  /* ── Logout ── */
  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    router.replace("/admin/login");
  }

  /* ── API helpers ── */
  async function updateListingStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        addToast(
          `Listing ${status === "approved" ? "approved" : status === "rejected" ? "rejected" : status === "sold" ? "marked as sold" : "updated"}`,
          "success"
        );
        fetchListings();
      } else {
        const d = await res.json();
        addToast(d.error || "Action failed", "error");
      }
    } catch {
      addToast("Network error", "error");
    }
  }

  async function handleDeleteListing(id: string) {
    if (!confirm("Are you sure you want to delete this listing? This cannot be undone."))
      return;
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        addToast("Listing deleted", "success");
        fetchListings();
      } else {
        const d = await res.json();
        addToast(d.error || "Delete failed", "error");
      }
    } catch {
      addToast("Network error", "error");
    }
  }

  if (!token) return null;

  /* ── Compute stats ── */
  const stats = {
    total: listings.length,
    pending: listings.filter((l) => l.status === "pending").length,
    approved: listings.filter((l) => l.status === "approved").length,
    sold: listings.filter((l) => l.status === "sold").length,
    rejected: listings.filter((l) => l.status === "rejected").length,
  };

  const tabs: { key: Tab; label: string; icon: JSX.Element }[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      key: "listings",
      label: "Listings",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      key: "add",
      label: "Add Listing",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-vault-bg flex">
      {/* ══════════════════════════════════════════════════════════════════════
         SIDEBAR (desktop) + mobile overlay
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 bg-vault-bg-light border-r border-vault-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-vault-border shrink-0">
          <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-vault-border">
            <Image
              src="/logo.png"
              alt="2kVault"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-display text-lg font-semibold tracking-wide text-text-primary">
              2kVault
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-gold font-semibold -mt-0.5">
              Admin
            </span>
          </div>
          {/* Mobile close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1.5 rounded-lg hover:bg-white/5 text-text-muted"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.key === "listings" && stats.pending > 0 && (
                <span className="ml-auto bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {stats.pending}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4 border-t border-vault-border shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════════════════════
         MAIN CONTENT
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-vault-border bg-vault-bg/80 backdrop-blur-md flex items-center px-4 sm:px-6 gap-4 shrink-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-text-secondary"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <h2 className="font-display text-xl font-semibold tracking-wide text-text-primary capitalize">
            {activeTab === "add" ? "Add Listing" : activeTab}
          </h2>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-text-muted text-sm hidden sm:block">
              Logged in as{" "}
              <span className="text-gold font-medium">
                {typeof window !== "undefined"
                  ? localStorage.getItem("admin_username") || "admin"
                  : "admin"}
              </span>
            </span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {activeTab === "dashboard" && (
                <DashboardTab stats={stats} listings={listings} />
              )}
              {activeTab === "listings" && (
                <ListingsTab
                  listings={listings}
                  onUpdateStatus={updateListingStatus}
                  onDelete={handleDeleteListing}
                  onRefresh={fetchListings}
                  token={token}
                  addToast={addToast}
                />
              )}
              {activeTab === "add" && (
                <AddListingTab
                  token={token}
                  onSuccess={() => {
                    fetchListings();
                    setActiveTab("listings");
                  }}
                  addToast={addToast}
                />
              )}
              {activeTab === "reviews" && <ReviewsTab />}
            </>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         TOASTS
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-lg text-sm font-medium shadow-vault-lg animate-slideUp ${
              t.type === "success"
                ? "bg-green/20 text-green-light border border-green/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   LOADING SKELETON
   ══════════════════════════════════════════════════════════════════════════════ */

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="glass-card p-6 shimmer h-32 rounded-xl" />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   DASHBOARD TAB
   ══════════════════════════════════════════════════════════════════════════════ */

function DashboardTab({
  stats,
  listings,
}: {
  stats: { total: number; pending: number; approved: number; sold: number; rejected: number };
  listings: Listing[];
}) {
  const statCards = [
    {
      label: "Total Listings",
      value: stats.total,
      color: "text-blue-light",
      bg: "bg-blue/10",
      border: "border-blue/20",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
    {
      label: "Pending Approval",
      value: stats.pending,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Approved / Live",
      value: stats.approved,
      color: "text-green-light",
      bg: "bg-green/10",
      border: "border-green/20",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Sold",
      value: stats.sold,
      color: "text-purple-light",
      bg: "bg-purple/10",
      border: "border-purple/20",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
    },
  ];

  const recentListings = listings.slice(0, 5);
  const totalRevenue = listings
    .filter((l) => l.status === "sold")
    .reduce((sum, l) => sum + l.price, 0);

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`glass-card p-5 rounded-xl border ${card.border} animate-fadeIn`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`${card.bg} ${card.color} p-2 rounded-lg`}>
                {card.icon}
              </span>
            </div>
            <p className="text-2xl font-display font-semibold text-text-primary">
              {card.value}
            </p>
            <p className="text-text-muted text-sm mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue + rejected row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card-gold p-5 rounded-xl">
          <p className="text-text-muted text-sm mb-1">Total Revenue (Sold)</p>
          <p className="text-3xl font-display font-semibold text-gradient-gold">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="glass-card p-5 rounded-xl border border-red-500/20">
          <p className="text-text-muted text-sm mb-1">Rejected</p>
          <p className="text-3xl font-display font-semibold text-red-400">
            {stats.rejected}
          </p>
        </div>
      </div>

      {/* Recent listings */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-vault-border">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Recent Listings
          </h3>
        </div>
        {recentListings.length === 0 ? (
          <div className="p-8 text-center text-text-muted text-sm">
            No listings yet.
          </div>
        ) : (
          <div className="divide-y divide-vault-border">
            {recentListings.map((l) => (
              <div
                key={l.id}
                className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-lg bg-vault-bg-card overflow-hidden shrink-0 flex items-center justify-center">
                  {l.image_urls.length > 0 ? (
                    <Image
                      src={l.image_urls[0]}
                      alt={l.title}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {l.title}
                  </p>
                  <p className="text-xs text-text-muted">
                    {l.console} &middot; {l.rep_level} &middot; ${l.price}
                  </p>
                </div>
                <StatusBadge status={l.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   STATUS BADGE
   ══════════════════════════════════════════════════════════════════════════════ */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    approved: "bg-green/15 text-green-light border-green/30",
    sold: "bg-blue/15 text-blue-light border-blue/30",
    rejected: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize shrink-0 ${
        styles[status] || "bg-vault-border text-text-muted border-vault-border"
      }`}
    >
      {status}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   LISTINGS TAB
   ══════════════════════════════════════════════════════════════════════════════ */

function ListingsTab({
  listings,
  onUpdateStatus,
  onDelete,
  onRefresh,
  token,
  addToast,
}: {
  listings: Listing[];
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  token: string;
  addToast: (msg: string, type: "success" | "error") => void;
}) {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const filtered =
    filter === "all"
      ? listings
      : listings.filter((l) => l.status === filter);

  const filterTabs: { key: StatusFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: listings.length },
    {
      key: "pending",
      label: "Pending",
      count: listings.filter((l) => l.status === "pending").length,
    },
    {
      key: "approved",
      label: "Approved",
      count: listings.filter((l) => l.status === "approved").length,
    },
    {
      key: "sold",
      label: "Sold",
      count: listings.filter((l) => l.status === "sold").length,
    },
    {
      key: "rejected",
      label: "Rejected",
      count: listings.filter((l) => l.status === "rejected").length,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((ft) => (
          <button
            key={ft.key}
            onClick={() => setFilter(ft.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === ft.key
                ? "bg-gold/10 text-gold border border-gold/20"
                : "bg-vault-bg-card text-text-secondary hover:text-text-primary border border-vault-border hover:border-vault-border-light"
            }`}
          >
            {ft.label}
            <span className="ml-1.5 text-xs opacity-70">({ft.count})</span>
          </button>
        ))}
      </div>

      {/* Listings grid */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 rounded-xl text-center">
          <p className="text-text-muted">No listings match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onEdit={() => setEditingListing(listing)}
            />
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editingListing && (
        <EditListingModal
          listing={editingListing}
          token={token}
          onClose={() => setEditingListing(null)}
          onSaved={() => {
            setEditingListing(null);
            onRefresh();
            addToast("Listing updated", "success");
          }}
          addToast={addToast}
        />
      )}
    </div>
  );
}

/* ── Single listing card ── */

function ListingCard({
  listing,
  onUpdateStatus,
  onDelete,
  onEdit,
}: {
  listing: Listing;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
}) {
  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-40 bg-vault-bg-card flex items-center justify-center">
        {listing.image_urls.length > 0 ? (
          <Image
            src={listing.image_urls[0]}
            alt={listing.title}
            fill
            className="object-cover"
          />
        ) : (
          <svg className="w-12 h-12 text-vault-border" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        )}
        <div className="absolute top-2 right-2">
          <StatusBadge status={listing.status} />
        </div>
        {listing.featured === 1 && (
          <span className="absolute top-2 left-2 bg-gold/90 text-vault-bg text-[10px] font-bold uppercase px-2 py-0.5 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="text-sm font-semibold text-text-primary truncate mb-1">
          {listing.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
          <span>{listing.console}</span>
          <span>&middot;</span>
          <span>{listing.rep_level}</span>
          <span>&middot;</span>
          <span>{listing.rep_percent}%</span>
        </div>
        <p className="text-lg font-display font-semibold text-gold mb-1">
          ${listing.price.toFixed(2)}
        </p>
        <p className="text-xs text-text-muted mb-3">
          Seller: {listing.seller_name}
        </p>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {listing.status === "pending" && (
            <>
              <ActionButton
                onClick={() => onUpdateStatus(listing.id, "approved")}
                color="green"
                label="Approve"
              />
              <ActionButton
                onClick={() => onUpdateStatus(listing.id, "rejected")}
                color="red"
                label="Reject"
              />
            </>
          )}
          {listing.status === "approved" && (
            <ActionButton
              onClick={() => onUpdateStatus(listing.id, "sold")}
              color="blue"
              label="Mark Sold"
            />
          )}
          <ActionButton onClick={onEdit} color="default" label="Edit" />
          <ActionButton
            onClick={() => onDelete(listing.id)}
            color="red"
            label="Delete"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Action button ── */

function ActionButton({
  onClick,
  color,
  label,
}: {
  onClick: () => void;
  color: "green" | "red" | "blue" | "default";
  label: string;
}) {
  const colorMap = {
    green:
      "bg-green/10 text-green-light hover:bg-green/20 border-green/20",
    red: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20",
    blue: "bg-blue/10 text-blue-light hover:bg-blue/20 border-blue/20",
    default:
      "bg-vault-bg-card text-text-secondary hover:text-text-primary hover:bg-vault-bg-card-hover border-vault-border",
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${colorMap[color]}`}
    >
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EDIT LISTING MODAL
   ══════════════════════════════════════════════════════════════════════════════ */

function EditListingModal({
  listing,
  token,
  onClose,
  onSaved,
  addToast,
}: {
  listing: Listing;
  token: string;
  onClose: () => void;
  onSaved: () => void;
  addToast: (msg: string, type: "success" | "error") => void;
}) {
  const [form, setForm] = useState({
    title: listing.title,
    description: listing.description,
    console: listing.console,
    rep_level: listing.rep_level,
    rep_percent: listing.rep_percent,
    price: listing.price,
    status: listing.status,
    featured: listing.featured === 1,
    seller_name: listing.seller_name,
    seller_discord: listing.seller_discord,
    seller_email: listing.seller_email,
  });
  const [saving, setSaving] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/listings/${listing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          featured: form.featured ? 1 : 0,
          price: Number(form.price),
          rep_percent: Number(form.rep_percent),
        }),
      });
      if (res.ok) {
        onSaved();
      } else {
        const d = await res.json();
        addToast(d.error || "Save failed", "error");
      }
    } catch {
      addToast("Network error", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-vault-bg-light border border-vault-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-vault-border sticky top-0 bg-vault-bg-light z-10">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Edit Listing
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted hover:text-text-primary"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <FieldInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <FieldTextarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <div className="grid grid-cols-2 gap-4">
            <FieldSelect
              label="Console"
              value={form.console}
              onChange={(v) => setForm({ ...form, console: v })}
              options={["PS5", "Xbox Series X/S"]}
            />
            <FieldSelect
              label="Status"
              value={form.status}
              onChange={(v) => setForm({ ...form, status: v })}
              options={["pending", "approved", "sold", "rejected"]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Rep Level" value={form.rep_level} onChange={(v) => setForm({ ...form, rep_level: v })} required />
            <FieldInput label="Rep %" value={String(form.rep_percent)} onChange={(v) => setForm({ ...form, rep_percent: Number(v) })} type="number" required />
          </div>
          <FieldInput label="Price ($)" value={String(form.price)} onChange={(v) => setForm({ ...form, price: Number(v) })} type="number" step="0.01" required />
          <FieldInput label="Seller Name" value={form.seller_name} onChange={(v) => setForm({ ...form, seller_name: v })} required />
          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Seller Discord" value={form.seller_discord} onChange={(v) => setForm({ ...form, seller_discord: v })} />
            <FieldInput label="Seller Email" value={form.seller_email} onChange={(v) => setForm({ ...form, seller_email: v })} type="email" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 rounded border-vault-border bg-vault-bg text-gold focus:ring-gold/30 focus:ring-2"
            />
            <span className="text-sm text-text-secondary">Featured listing</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-vault-bg-card border border-vault-border text-text-secondary text-sm font-medium hover:bg-vault-bg-card-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-lg bg-gradient-gold text-vault-bg text-sm font-semibold hover:shadow-vault-glow transition-all duration-200 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ADD LISTING TAB
   ══════════════════════════════════════════════════════════════════════════════ */

function AddListingTab({
  token,
  onSuccess,
  addToast,
}: {
  token: string;
  onSuccess: () => void;
  addToast: (msg: string, type: "success" | "error") => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    console: "PS5",
    rep_level: "",
    rep_percent: 0,
    price: 0,
    status: "approved",
    featured: false,
    seller_name: "2kVault Admin",
    seller_discord: "",
    seller_email: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append("file", files[i]);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (res.ok) {
          const data = await res.json();
          newUrls.push(data.url);
        } else {
          addToast(`Failed to upload ${files[i].name}`, "error");
        }
      } catch {
        addToast(`Upload error: ${files[i].name}`, "error");
      }
    }

    setImageUrls((prev) => [...prev, ...newUrls]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.title || !form.rep_level || form.price <= 0) {
      addToast("Please fill all required fields", "error");
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          rep_percent: Number(form.rep_percent),
          image_urls: imageUrls,
          featured: form.featured ? 1 : 0,
        }),
      });

      if (res.ok) {
        // If admin wants it approved, update status (since POST defaults to pending)
        const created = await res.json();
        if (form.status !== "pending") {
          await fetch(`/api/listings/${created.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: form.status,
              featured: form.featured ? 1 : 0,
            }),
          });
        }
        addToast("Listing created successfully", "success");
        onSuccess();
      } else {
        const d = await res.json();
        addToast(d.error || "Failed to create listing", "error");
      }
    } catch {
      addToast("Network error", "error");
    } finally {
      setSubmitting(false);
    }
  }

  const repLevels = [
    "Rookie 1", "Rookie 2", "Rookie 3",
    "Pro 1", "Pro 2", "Pro 3",
    "All-Star 1", "All-Star 2", "All-Star 3",
    "Superstar 1", "Superstar 2", "Superstar 3",
    "Veteran 1", "Veteran 2", "Veteran 3",
    "Legend 1", "Legend 2", "Legend 3",
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-vault-border">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Create New Listing
          </h3>
          <p className="text-text-muted text-sm mt-0.5">
            Add a listing directly as admin. Defaults to approved.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <FieldInput
            label="Title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
            required
            placeholder="e.g. Legend 1 PS5 Account - Max Badges"
          />

          <FieldTextarea
            label="Description"
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
            placeholder="Detailed description of the account..."
          />

          <div className="grid grid-cols-2 gap-4">
            <FieldSelect
              label="Console"
              value={form.console}
              onChange={(v) => setForm({ ...form, console: v })}
              options={["PS5", "Xbox Series X/S"]}
            />
            <FieldSelect
              label="Rep Level"
              value={form.rep_level}
              onChange={(v) => setForm({ ...form, rep_level: v })}
              options={repLevels}
              placeholder="Select rep level..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldInput
              label="Rep Percentage"
              value={String(form.rep_percent)}
              onChange={(v) => setForm({ ...form, rep_percent: Number(v) })}
              type="number"
              min="0"
              max="100"
            />
            <FieldInput
              label="Price ($)"
              value={String(form.price)}
              onChange={(v) => setForm({ ...form, price: Number(v) })}
              type="number"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Images
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {imageUrls.map((url, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-vault-border group"
                >
                  <Image
                    src={url}
                    alt={`Upload ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-20 h-20 rounded-lg border-2 border-dashed border-vault-border hover:border-gold/40 flex flex-col items-center justify-center text-text-muted hover:text-gold transition-colors"
              >
                {uploading ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Add</span>
                  </>
                )}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldSelect
              label="Status"
              value={form.status}
              onChange={(v) => setForm({ ...form, status: v })}
              options={["approved", "pending"]}
            />
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-vault-border bg-vault-bg text-gold focus:ring-gold/30 focus:ring-2"
                />
                <span className="text-sm text-text-secondary">Featured</span>
              </label>
            </div>
          </div>

          <div className="divider-gold" />

          <FieldInput
            label="Seller Name"
            value={form.seller_name}
            onChange={(v) => setForm({ ...form, seller_name: v })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FieldInput
              label="Seller Discord"
              value={form.seller_discord}
              onChange={(v) => setForm({ ...form, seller_discord: v })}
              placeholder="Username#0000"
            />
            <FieldInput
              label="Seller Email"
              value={form.seller_email}
              onChange={(v) => setForm({ ...form, seller_email: v })}
              type="email"
              placeholder="seller@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-gradient-gold text-vault-bg font-semibold text-sm btn-glow-gold hover:shadow-vault-glow transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating..." : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   REVIEWS TAB
   ══════════════════════════════════════════════════════════════════════════════ */

function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* Fetch reviews - using a simple GET to the reviews data.
       Since there is no dedicated reviews API, we'll fetch from the seed data
       by making a call to a general endpoint. For now we'll load directly. */
    async function load() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch {
        /* If no reviews endpoint, show empty */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-6 shimmer h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="glass-card p-12 rounded-xl text-center">
        <svg className="w-12 h-12 mx-auto mb-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        <p className="text-text-muted font-medium">No reviews yet.</p>
        <p className="text-text-muted text-sm mt-1">Reviews from users will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-3xl">
      {reviews.map((review) => (
        <div key={review.id} className="glass-card p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-vault-bg font-semibold text-sm">
              {review.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {review.name}
              </p>
              {review.service && (
                <p className="text-xs text-text-muted">{review.service}</p>
              )}
            </div>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "text-gold" : "text-vault-border"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {review.text}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   SHARED FORM FIELD COMPONENTS
   ══════════════════════════════════════════════════════════════════════════════ */

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  step,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        className="w-full px-4 py-2.5 rounded-lg bg-vault-bg border border-vault-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all duration-200"
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-2.5 rounded-lg bg-vault-bg border border-vault-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all duration-200 resize-y"
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-vault-bg border border-vault-border text-text-primary text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all duration-200 appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2394a3b8'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "16px",
          paddingRight: "40px",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

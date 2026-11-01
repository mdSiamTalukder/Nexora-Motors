
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, UserRound, LogOut } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function AdminHeader({ onMenuClick, title }: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Unable to logout.");
        return;
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-base-300 bg-base-100 px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="btn btn-ghost btn-square btn-sm lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>

        <h1 className="text-lg font-semibold text-base-content">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="btn btn-ghost btn-circle btn-sm"
          aria-label="Notifications"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-2 border-l border-base-300 pl-3 sm:pl-4">
          <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
            <UserRound size={19} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-base-content">
              Admin
            </p>
            <p className="text-xs text-base-content/55">
              Showroom Manager
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="btn btn-ghost btn-sm gap-2"
          aria-label="Logout"
        >
          {loggingOut ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <LogOut size={18} />
          )}

          <span className="hidden sm:inline">
            {loggingOut ? "Signing Out..." : "Logout"}
          </span>
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="absolute right-4 top-full mt-2 rounded-lg border border-error/30 bg-base-100 px-4 py-3 text-sm text-error shadow-sm"
        >
          {error}
        </div>
      )}
    </header>
  );
}

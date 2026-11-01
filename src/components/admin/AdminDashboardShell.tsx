
"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

interface AdminDashboardShellProps {
  children: ReactNode;
}

export function AdminDashboardShell({
  children,
}: AdminDashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/cars": "Manage Cars",
    "/admin/inquiries": "Customer Inquiries",
    "/admin/settings": "Settings",
  };

  const title = pageTitles[pathname] ?? "Admin Dashboard";

  return (
    <div className="min-h-screen bg-base-200/40">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <AdminHeader
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to manage Nexora Motors.",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-base-200/40 px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-base-content/60 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Website
        </Link>

        <AdminLoginForm />

        <p className="mt-6 text-center text-xs text-base-content/45">
          © {new Date().getFullYear()} Nexora Motors. All rights reserved.
        </p>
      </div>
    </main>
  );
}


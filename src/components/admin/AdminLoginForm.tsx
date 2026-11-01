
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Invalid email or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <div className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <LockKeyhole size={23} />
        </div>

        <h1 className="font-heading text-2xl font-bold text-base-content">
          Admin Login
        </h1>

        <p className="mt-2 text-sm leading-6 text-base-content/65">
          Sign in to manage your Nexora Motors showroom.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="label pb-2">
            <span className="label-text font-semibold">Email Address</span>
          </label>

          <label className="input input-bordered flex w-full items-center gap-3 bg-base-100">
            <Mail size={18} className="text-base-content/45" />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              autoComplete="username"
              required
              maxLength={254}
              className="grow"
            />
          </label>
        </div>

        <div>
          <label htmlFor="password" className="label pb-2">
            <span className="label-text font-semibold">Password</span>
          </label>

          <label className="input input-bordered flex w-full items-center gap-3 bg-base-100">
            <LockKeyhole size={18} className="text-base-content/45" />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              maxLength={128}
              className="grow"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="text-base-content/50 hover:text-base-content"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-base-300 pt-5 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-base-content/60 transition-colors hover:text-primary"
        >
          Back to Nexora Motors
        </Link>
      </div>
    </div>
  );
}

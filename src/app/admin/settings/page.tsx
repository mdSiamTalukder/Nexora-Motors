
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
} from "lucide-react";

interface SettingsFormData {
  showroomName: string;
  email: string;
  phone: string;
  address: string;
  websiteUrl: string;
}

interface SettingsApiResponse {
  success?: boolean;
  message?: string;
  data?: Partial<SettingsFormData> | null;
}

const initialSettings: SettingsFormData = {
  showroomName: "Nexora Motors",
  email: "",
  phone: "",
  address: "",
  websiteUrl: "",
};

export default function AdminSettingsPage() {
  const router = useRouter();

  const [settings, setSettings] =
    useState<SettingsFormData>(initialSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        const result =
          (await response.json()) as SettingsApiResponse;

        if (response.status === 401) {
          router.replace("/admin/login");
          router.refresh();
          return;
        }

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || "Unable to load showroom settings.",
          );
        }

        setSettings({
          showroomName: result.data.showroomName ?? "Nexora Motors",
          email: result.data.email ?? "",
          phone: result.data.phone ?? "",
          address: result.data.address ?? "",
          websiteUrl: result.data.websiteUrl ?? "",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load showroom settings.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [router]);

  const handleChange = (
    field: keyof SettingsFormData,
    value: string,
  ) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const result =
        (await response.json()) as SettingsApiResponse;

      if (response.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to save showroom settings.",
        );
      }

      if (result.data) {
        setSettings({
          showroomName: result.data.showroomName ?? "",
          email: result.data.email ?? "",
          phone: result.data.phone ?? "",
          address: result.data.address ?? "",
          websiteUrl: result.data.websiteUrl ?? "",
        });
      }

      setSuccess("Showroom settings saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save showroom settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-base-content">
          Showroom Settings
        </h2>

        <p className="mt-1 text-sm text-base-content/60">
          Manage your Nexora Motors showroom information.
        </p>
      </div>

      <section className="rounded-xl border border-base-300 bg-base-100 p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3 border-b border-base-300 pb-5">
          <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
            <Building2 size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-base-content">
              General Information
            </h3>
            <p className="text-xs text-base-content/55">
              Your public showroom details
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <span className="loading loading-spinner loading-md text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="showroomName" className="label pb-2">
                <span className="label-text font-semibold">
                  Showroom Name
                </span>
              </label>

              <label className="input input-bordered flex items-center gap-3">
                <Building2 size={18} className="text-base-content/45" />
                <input
                  id="showroomName"
                  type="text"
                  value={settings.showroomName}
                  onChange={(event) =>
                    handleChange("showroomName", event.target.value)
                  }
                  required
                  maxLength={100}
                  className="grow"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="label pb-2">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-3">
                  <Mail size={18} className="text-base-content/45" />
                  <input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    maxLength={254}
                    className="grow min-w-0"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="phone" className="label pb-2">
                  <span className="label-text font-semibold">
                    Phone Number
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-3">
                  <Phone size={18} className="text-base-content/45" />
                  <input
                    id="phone"
                    type="tel"
                    value={settings.phone}
                    onChange={(event) =>
                      handleChange("phone", event.target.value)
                    }
                    maxLength={30}
                    className="grow min-w-0"
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="label pb-2">
                <span className="label-text font-semibold">
                  Showroom Address
                </span>
              </label>

              <label className="input input-bordered flex items-center gap-3">
                <MapPin size={18} className="text-base-content/45" />
                <input
                  id="address"
                  type="text"
                  value={settings.address}
                  onChange={(event) =>
                    handleChange("address", event.target.value)
                  }
                  maxLength={300}
                  className="grow"
                />
              </label>
            </div>

            <div>
              <label htmlFor="websiteUrl" className="label pb-2">
                <span className="label-text font-semibold">
                  Website URL
                </span>
              </label>

              <label className="input input-bordered flex items-center gap-3">
                <Globe size={18} className="text-base-content/45" />
                <input
                  id="websiteUrl"
                  type="url"
                  value={settings.websiteUrl}
                  onChange={(event) =>
                    handleChange("websiteUrl", event.target.value)
                  }
                  placeholder="https://example.com"
                  maxLength={255}
                  className="grow"
                />
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

            {success && (
              <div
                role="status"
                className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
              >
                {success}
              </div>
            )}

            <div className="flex justify-end border-t border-base-300 pt-5">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary gap-2"
              >
                {saving ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <Save size={17} />
                )}

                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </section>

      <p className="text-xs leading-5 text-base-content/50">
        Your showroom information is securely saved in the database.
      </p>
    </div>
  );
}

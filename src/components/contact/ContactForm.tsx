
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Send, LoaderCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      subject: String(formData.get("subject") || ""),
      vehicle: String(formData.get("vehicle") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your message. Please try again.",
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Send us a message
        </span>

        <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
          How can we help you?
        </h2>

        <p className="mt-3 text-sm leading-6 text-base-content/65">
          Fill out the form below and let us know what you are looking for.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-success/30 bg-success/10 p-6">
          <CheckCircle2 className="size-10 text-success" />

          <h3 className="mt-4 text-lg font-bold text-base-content">
            Message Sent Successfully!
          </h3>

          <p className="mt-2 text-sm leading-6 text-base-content/70">
            Thank you for contacting Nexora Motors. Your inquiry has been
            received successfully. Our team will get back to you soon.
          </p>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setError("");
            }}
            className="btn btn-outline btn-sm mt-5"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-error/30 bg-error/10 p-4 text-sm text-error"
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="label pb-2">
                <span className="label-text font-semibold">Full Name *</span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
                maxLength={100}
                disabled={loading}
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="label pb-2">
                <span className="label-text font-semibold">Email Address *</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                maxLength={254}
                disabled={loading}
                className="input input-bordered w-full bg-base-100"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="label pb-2">
                <span className="label-text font-semibold">Phone Number *</span>
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+880 1XXXXXXXXX"
                autoComplete="tel"
                required
                maxLength={30}
                disabled={loading}
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label htmlFor="subject" className="label pb-2">
                <span className="label-text font-semibold">Subject *</span>
              </label>

              <select
                id="subject"
                name="subject"
                required
                defaultValue=""
                disabled={loading}
                className="select select-bordered w-full bg-base-100"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Vehicle Inquiry">Vehicle Inquiry</option>
                <option value="Pricing Information">Pricing Information</option>
                <option value="Test Drive">Test Drive</option>
                <option value="Showroom Visit">Showroom Visit</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="vehicle" className="label pb-2">
              <span className="label-text font-semibold">
                Interested Vehicle
              </span>
              <span className="label-text-alt text-base-content/50">
                Optional
              </span>
            </label>

            <input
              id="vehicle"
              name="vehicle"
              type="text"
              placeholder="e.g. BMW M5"
              maxLength={100}
              disabled={loading}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div>
            <label htmlFor="message" className="label pb-2">
              <span className="label-text font-semibold">Your Message *</span>
            </label>

            <textarea
              id="message"
              name="message"
              placeholder="Tell us how we can help you..."
              required
              minLength={10}
              maxLength={3000}
              rows={5}
              disabled={loading}
              className="textarea textarea-bordered min-h-36 w-full resize-y bg-base-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full sm:w-auto"
          >
            {loading ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send Message
                <ArrowRight className="size-4" />
              </>
            )}
          </button>

          <p className="text-xs leading-5 text-base-content/50">
            * Required fields. Your information will be used to respond to your
            inquiry.
          </p>
        </form>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { siteConfig } from "@/config/site";

const quickLinks = siteConfig.nav;

const services = [
  "Quality Vehicles",
  "Vehicle Consultation",
  "Buying Assistance",
  "Customer Support",
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact-details"
      className="scroll-mt-24 border-t border-base-300 bg-base-200"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-sm text-sm leading-6 text-base-content/70">
              A single-dealer showroom focused on quality vehicles, clear guidance, and a
              straightforward car-buying experience.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} (profile coming soon)`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-base-content/65 transition-colors hover:text-primary"
                >
                  {label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-base-content">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-base-content">
              Our Services
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-base-content/70">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-base-content">
              Get in Touch
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-base-content/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-base-content/70">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-base-content/70">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-base-300 pt-6 text-center text-xs text-base-content/55 sm:flex-row sm:text-left">
          <p>© {year} Nexora Motors. All rights reserved.</p>
          <p>Single-dealer showroom · Built for the road ahead.</p>
        </div>
      </div>
    </footer>
  );
}

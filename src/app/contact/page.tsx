
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nexora Motors for vehicle availability, pricing, or to arrange a showroom viewing.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let showroomName: string = "Nexora Motors";
  let email: string = siteConfig.contact.email;
  let phone: string = siteConfig.contact.phone;
  let address: string = siteConfig.contact.address;
  let websiteUrl: string = "";

  try {
    const settings = await prisma.showroomSettings.findUnique({
      where: { id: "default" },
      select: {
        showroomName: true,
        email: true,
        phone: true,
        address: true,
        websiteUrl: true,
      },
    });

    if (settings) {
      showroomName = settings.showroomName;
      email = settings.email || "";
      phone = settings.phone || "";
      address = settings.address || "";
      websiteUrl = settings.websiteUrl || "";
    }
  } catch (error) {
    console.error("Contact page settings error:", error);
  }

  const contactDetails = [
    { title: "Showroom", value: address, icon: MapPin },
    { title: "Phone", value: phone, icon: Phone },
    { title: "Email", value: email, icon: Mail },
    ...(websiteUrl
      ? [{ title: "Website", value: websiteUrl, icon: Globe }]
      : []),
  ];

  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-base-300 bg-base-200/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Contact {showroomName}
            </span>

            <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl lg:text-6xl">
              Let&apos;s talk about
              <span className="block text-primary">your next car.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-base-content/65 sm:text-lg">
              Have a question about a vehicle? Need pricing information or want
              to visit our showroom? Send us a message and let us help you find
              the right car.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Information */}
      <section className="bg-base-100 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_0.8fr] lg:gap-14">
            <ContactForm />

            <aside className="space-y-8 lg:pt-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Contact Information
                </span>

                <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
                  We&apos;d love to hear from you.
                </h2>

                <p className="mt-4 text-sm leading-7 text-base-content/65">
                  Our team is here to help with vehicle availability, pricing,
                  showroom visits, and any questions you may have.
                </p>
              </div>

              <div className="space-y-4">
                {contactDetails.map(({ title, value, icon: Icon }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition-colors hover:bg-base-200/50"
                  >
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-base-content">
                        {title}
                      </h3>

                      <p className="mt-1 break-words text-sm leading-6 text-base-content/65">
                        {value || "Not provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 rounded-2xl border border-base-300 bg-base-200/40 p-5">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="size-5" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base-content">
                    Showroom Visits
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-base-content/65">
                    Contact us to arrange a convenient time to visit and explore
                    our collection.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Showroom Section */}
      <section className="border-t border-base-300 bg-base-200/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-base-300 shadow-sm">
            <Image
              src="/images/showroom.jpg"
              alt={`${showroomName} showroom`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Visit {showroomName}
            </span>

            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Your next car is waiting to be discovered.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-base-content/65">
              Explore our current collection and find a vehicle that matches
              your needs. Our team is ready to help you take the next step.
            </p>

            <Link href="/cars" className="btn btn-primary mt-7">
              Explore Our Cars
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

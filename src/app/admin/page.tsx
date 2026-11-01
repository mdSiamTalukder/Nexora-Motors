
import Link from "next/link";
import {
  CarFront,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalCars,
    availableCars,
    soldCars,
    totalInquiries,
    newInquiries,
    recentCars,
    recentInquiries,
  ] = await Promise.all([
    prisma.car.count(),
    prisma.car.count({ where: { availability: "available" } }),
    prisma.car.count({ where: { availability: "sold" } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.car.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);

  const stats = [
    {
      title: "Total Cars",
      value: totalCars,
      description: "Cars in your inventory",
      icon: CarFront,
    },
    {
      title: "Available Cars",
      value: availableCars,
      description: "Currently available",
      icon: CheckCircle2,
    },
    {
      title: "Sold Cars",
      value: soldCars,
      description: "Successfully sold",
      icon: TrendingUp,
    },
    {
      title: "Customer Inquiries",
      value: totalInquiries,
      description: `${newInquiries} new customer messages`,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-base-content">
          Welcome to Nexora Motors
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Here is an overview of your showroom.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-base-300 bg-base-100 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-base-content/60">
                  {stat.title}
                </p>

                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-base-content">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-base-content/50">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-base-300 bg-base-100 p-6">
          <h3 className="text-lg font-semibold text-base-content">
            Quick Actions
          </h3>

          <p className="mt-1 text-sm text-base-content/55">
            Manage your showroom quickly.
          </p>

          <div className="mt-5 space-y-3">
            <Link
              href="/admin/cars"
              className="flex items-center justify-between rounded-lg border border-base-300 p-4 transition-colors hover:bg-base-200"
            >
              <div className="flex items-center gap-3">
                <CarFront size={20} className="text-primary" />
                <span className="text-sm font-medium text-base-content">
                  Manage Cars
                </span>
              </div>

              <ArrowRight size={18} className="text-base-content/50" />
            </Link>

            <Link
              href="/admin/inquiries"
              className="flex items-center justify-between rounded-lg border border-base-300 p-4 transition-colors hover:bg-base-200"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className="text-primary" />
                <span className="text-sm font-medium text-base-content">
                  View Customer Inquiries
                </span>
              </div>

              <ArrowRight size={18} className="text-base-content/50" />
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-base-300 bg-base-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-base-content">
                Recent Customer Messages
              </h3>

              <p className="mt-1 text-sm text-base-content/55">
                Latest messages from your customers.
              </p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="mt-5 space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="border-b border-base-300 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-base-content">
                        {inquiry.fullName}
                      </p>

                      <p className="mt-1 truncate text-xs text-base-content/60">
                        {inquiry.subject}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {inquiry.status}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-base-content/60">
                    {inquiry.message}
                  </p>

                  <p className="mt-2 text-xs text-base-content/45">
                    {new Date(inquiry.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex min-h-28 flex-col items-center justify-center text-center">
              <MessageSquare size={28} className="text-base-content/25" />

              <p className="mt-3 text-sm text-base-content/60">
                No customer messages yet.
              </p>
            </div>
          )}
        </section>
      </div>

      <section className="rounded-xl border border-base-300 bg-base-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-base-content">
              Recently Added Cars
            </h3>

            <p className="mt-1 text-sm text-base-content/55">
              Your latest showroom inventory.
            </p>
          </div>

          <Link
            href="/admin/cars"
            className="text-sm font-medium text-primary hover:underline"
          >
            Manage All
          </Link>
        </div>

        {recentCars.length > 0 ? (
          <div className="mt-5 divide-y divide-base-300">
            {recentCars.map((car) => (
              <div
                key={car.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-semibold text-base-content">
                    {car.year} {car.make} {car.model}
                  </p>

                  <p className="mt-1 text-xs text-base-content/55">
                    {car.trim} · {car.mileage.toLocaleString("en-US")} miles
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-base-content">
                    ৳ {car.price.toLocaleString("en-US")}
                  </p>

                  <span className="text-xs capitalize text-base-content/55">
                    {car.availability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-base-content/55">
            No cars added yet.
          </p>
        )}
      </section>
    </div>
  );
}


import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Clock3,
  Car,
  User,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteInquiryButton } from "@/components/admin/DeleteInquiryButton";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const [inquiries, totalInquiries, newInquiries, contactedInquiries] =
    await Promise.all([
      prisma.inquiry.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.inquiry.count(),
      prisma.inquiry.count({
        where: { status: "NEW" },
      }),
      prisma.inquiry.count({
        where: { status: "CONTACTED" },
      }),
    ]);

  const inquiryStats = [
    {
      title: "Total Inquiries",
      value: totalInquiries,
    },
    {
      title: "New Inquiries",
      value: newInquiries,
    },
    {
      title: "Contacted",
      value: contactedInquiries,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">
          Customer Inquiries
        </h2>

        <p className="mt-1 text-sm text-base-content/60">
          View and manage messages from potential car buyers.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {inquiryStats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-base-300 bg-base-100 p-5"
          >
            <p className="text-sm text-base-content/60">
              {stat.title}
            </p>

            <p className="mt-2 text-2xl font-bold text-base-content">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-base-300 bg-base-100 p-4 sm:flex-row">
        <label className="input input-bordered flex flex-1 items-center gap-2">
          <Search size={18} className="text-base-content/45" />

          <input
            type="search"
            placeholder="Search by customer name or email..."
            disabled
            className="grow"
          />
        </label>

        <select
          className="select select-bordered w-full sm:w-48"
          defaultValue="all"
          disabled
          aria-label="Filter inquiries by status"
        >
          <option value="all">All Inquiries</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {/* Inquiry List */}
      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-base-300 bg-base-100 px-5 py-16 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-base-200 text-base-content/50">
            <MessageSquare size={27} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-base-content">
            No Inquiries Yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-base-content/55">
            Customer inquiries submitted through your website will appear here.
            You will be able to review customer details and manage inquiry status.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <article
              key={inquiry.id}
              className="rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6"
            >
              {/* Customer Header */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-base-200 text-base-content/60">
                    <User size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-base-content">
                      {inquiry.fullName}
                    </h3>

                    <p className="mt-1 text-sm text-base-content/60">
                      {inquiry.subject}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`badge ${
                      inquiry.status === "NEW"
                        ? "badge-success"
                        : inquiry.status === "CONTACTED"
                          ? "badge-info"
                          : "badge-ghost"
                    }`}
                  >
                    {inquiry.status}
                  </span>

                  <DeleteInquiryButton inquiryId={inquiry.id} />
                </div>
              </div>

              {/* Customer Details */}
              <div className="mt-5 grid gap-3 border-t border-base-300 pt-5 text-sm sm:grid-cols-2">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="flex min-w-0 items-center gap-2 text-base-content/65 hover:text-primary"
                >
                  <Mail size={17} className="shrink-0" />
                  <span className="break-all">{inquiry.email}</span>
                </a>

                <a
                  href={`tel:${inquiry.phone}`}
                  className="flex items-center gap-2 text-base-content/65 hover:text-primary"
                >
                  <Phone size={17} className="shrink-0" />
                  {inquiry.phone}
                </a>

                <div className="flex items-center gap-2 text-base-content/65">
                  <Clock3 size={17} className="shrink-0" />
                  {new Intl.DateTimeFormat("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Dhaka",
                  }).format(inquiry.createdAt)}
                </div>

                {inquiry.vehicle && (
                  <div className="flex items-center gap-2 text-base-content/65">
                    <Car size={17} className="shrink-0" />
                    {inquiry.vehicle}
                  </div>
                )}
              </div>

              {/* Customer Message */}
              <div className="mt-5 rounded-lg bg-base-200/60 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-base-content/50">
                  Customer Message
                </p>

                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-base-content/80">
                  {inquiry.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

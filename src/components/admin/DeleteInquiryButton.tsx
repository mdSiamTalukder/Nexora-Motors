
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteInquiryButtonProps {
  inquiryId: string;
}

export function DeleteInquiryButton({
  inquiryId,
}: DeleteInquiryButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this inquiry?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/admin/inquiries/${encodeURIComponent(inquiryId)}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete inquiry.");
      }

      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      aria-label="Delete inquiry"
      title="Delete inquiry"
      className="btn btn-sm btn-outline btn-error gap-2"
    >
      <Trash2 size={16} />
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}

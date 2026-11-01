
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CarFront,
  ImagePlus,
  LoaderCircle,
  Trash2,
  Upload,
} from "lucide-react";

export function CarForm() {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Revoke old preview URLs when the preview changes or component unmounts.
  useEffect(() => {
    if (!previewUrl) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleImageChange(file: File | undefined) {
    setError("");
    setSuccess("");
    setImageUrl("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must not exceed 5 MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setImageFile(file);
    setPreviewUrl(objectUrl);
  }

  function removeImage() {
    setImageFile(null);
    setPreviewUrl("");
    setImageUrl("");
    setImageAlt("");
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!imageFile) {
      setError("Please select a car image.");
      return;
    }

    const imageAltValue = String(formData.get("imageAlt") || "").trim();

    if (imageAltValue.length < 5) {
      setError("Image description must be at least 5 characters.");
      return;
    }

    try {
      setUploading(true);

      const uploadData = new FormData();
      uploadData.append("image", imageFile);

      const uploadResponse = await fetch("/api/admin/cars/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.success) {
        throw new Error(uploadResult.message || "Image upload failed.");
      }

      const uploadedImageUrl = uploadResult.data.url as string;
      setImageUrl(uploadedImageUrl);
      setUploading(false);

      const carData = {
        year: Number(formData.get("year")),
        make: String(formData.get("make") || "").trim(),
        model: String(formData.get("model") || "").trim(),
        trim: String(formData.get("trim") || "").trim(),
        price: Number(formData.get("price")),
        mileage: Number(formData.get("mileage")),
        transmission: String(formData.get("transmission")),
        fuelType: String(formData.get("fuelType")),
        availability: String(formData.get("availability")),
        image: uploadedImageUrl,
        imageAlt: imageAltValue,
      };

      setSaving(true);

      const response = await fetch("/api/admin/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save car.");
      }

      setSuccess("Car added successfully.");

      router.push("/admin/cars");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setUploading(false);
      setSaving(false);
    }
  }

  const isSubmitting = uploading || saving;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link
          href="/admin/cars"
          className="mb-4 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content"
        >
          <ArrowLeft size={16} />
          Back to Manage Cars
        </Link>

        <h2 className="text-2xl font-bold text-base-content">
          Add New Car
        </h2>

        <p className="mt-1 text-sm text-base-content/60">
          Enter vehicle information and add it to your showroom inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <CarFront className="size-5 text-base-content/60" />
            <h3 className="text-lg font-semibold text-base-content">
              Vehicle Information
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="form-control">
              <label className="label" htmlFor="make">
                <span className="label-text font-medium">Brand / Make *</span>
              </label>
              <input
                id="make"
                name="make"
                type="text"
                placeholder="e.g. Toyota"
                className="input input-bordered w-full"
                maxLength={60}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="model">
                <span className="label-text font-medium">Model *</span>
              </label>
              <input
                id="model"
                name="model"
                type="text"
                placeholder="e.g. Camry"
                className="input input-bordered w-full"
                maxLength={80}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="trim">
                <span className="label-text font-medium">Trim / Variant *</span>
              </label>
              <input
                id="trim"
                name="trim"
                type="text"
                placeholder="e.g. Hybrid Premium"
                className="input input-bordered w-full"
                maxLength={100}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="year">
                <span className="label-text font-medium">Year *</span>
              </label>
              <input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                placeholder="2024"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text font-medium">Price *</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                step="1"
                placeholder="4500000"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="mileage">
                <span className="label-text font-medium">Mileage (km) *</span>
              </label>
              <input
                id="mileage"
                name="mileage"
                type="number"
                min="0"
                step="1"
                placeholder="25000"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="transmission">
                <span className="label-text font-medium">Transmission *</span>
              </label>
              <select
                id="transmission"
                name="transmission"
                className="select select-bordered w-full"
                defaultValue="Automatic"
                required
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="fuelType">
                <span className="label-text font-medium">Fuel Type *</span>
              </label>
              <select
                id="fuelType"
                name="fuelType"
                className="select select-bordered w-full"
                defaultValue="Petrol"
                required
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="availability">
                <span className="label-text font-medium">Availability *</span>
              </label>
              <select
                id="availability"
                name="availability"
                className="select select-bordered w-full"
                defaultValue="available"
                required
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <ImagePlus className="size-5 text-base-content/60" />
            <h3 className="text-lg font-semibold text-base-content">
              Vehicle Image
            </h3>
          </div>

          <div className="space-y-4">
            {!previewUrl ? (
              <label
                htmlFor="car-image"
                className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-base-300 bg-base-200/30 p-6 text-center transition-colors hover:border-primary/50"
              >
                <div className="mb-4 grid size-14 place-items-center rounded-full bg-base-200 text-base-content/60">
                  <Upload size={25} />
                </div>

                <span className="font-semibold text-base-content">
                  Click to upload car image
                </span>

                <span className="mt-2 text-sm text-base-content/55">
                  JPG, PNG or WEBP · Maximum 5 MB
                </span>
              </label>
            ) : (
              <div className="overflow-hidden rounded-xl border border-base-300">
                <div className="relative bg-base-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Selected car preview"
                    className="max-h-96 w-full object-contain"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-base-300 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-base-content">
                      {imageFile?.name}
                    </p>
                    <p className="text-xs text-base-content/55">
                      {imageFile
                        ? `${(imageFile.size / 1024 / 1024).toFixed(2)} MB`
                        : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={isSubmitting}
                    className="btn btn-outline btn-error btn-sm gap-2"
                  >
                    <Trash2 size={15} />
                    Remove Image
                  </button>
                </div>
              </div>
            )}

            <input
              id="car-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              disabled={isSubmitting}
              onChange={(event) =>
                handleImageChange(event.target.files?.[0])
              }
            />

            {previewUrl && (
              <label
                htmlFor="car-image"
                className="btn btn-outline btn-sm cursor-pointer"
              >
                <Upload size={15} />
                Choose Another Image
              </label>
            )}

            <div className="form-control">
              <label className="label" htmlFor="imageAlt">
                <span className="label-text font-medium">
                  Image Description (Alt Text) *
                </span>
              </label>
              <input
                id="imageAlt"
                name="imageAlt"
                type="text"
                value={imageAlt}
                onChange={(event) => setImageAlt(event.target.value)}
                placeholder="Describe the vehicle shown in the image"
                className="input input-bordered w-full"
                minLength={5}
                maxLength={200}
                required
              />
            </div>

            {imageUrl && (
              <p className="text-xs text-success">
                Image uploaded successfully to Cloudinary.
              </p>
            )}
          </div>
        </section>

        {error && (
          <div role="alert" className="alert alert-error text-sm">
            {error}
          </div>
        )}

        {success && (
          <div role="status" className="alert alert-success text-sm">
            {success}
          </div>
        )}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link href="/admin/cars" className="btn btn-outline">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary min-w-40 gap-2"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                {uploading ? "Uploading Image..." : "Saving Car..."}
              </>
            ) : (
              "Save Car"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

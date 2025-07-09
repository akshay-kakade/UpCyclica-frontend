"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  FileUp, PencilLine, Weight,
  MessageSquareText, Soup, Factory,
  Leaf, DollarSign, Brain, Recycle
} from "lucide-react";

const CLOUDINARY_UPLOAD_PRESET = "wasteUploads";
const CLOUDINARY_CLOUD_NAME = "dngie0oey";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ClassificationResult {
  category: string;
  suggested_method: string;
  roi_estimate: string;
  co2_saved_kg: number;
}

export default function SubmitWastePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const { getToken } = useAuth();

  const autofillLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const address = data.display_name || `${latitude}, ${longitude}`;
        const input = document.querySelector<HTMLInputElement>('input[name="location"]');
        if (input) input.value = address;
      } catch {
        alert("Failed to retrieve address.");
      }
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("proof") as File;

      let fileUrl = "";
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
          { method: "POST", body: uploadData }
        );

        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploaded = await uploadRes.json();
        fileUrl = uploaded.secure_url;
      }

      const classifyRes = await fetch(`${API_URL}/classify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: formData.get("description"),
          file_url: fileUrl,
        }),
      });

      if (!classifyRes.ok) throw new Error("Classification failed");
      const data = await classifyRes.json();
      setResult(data.classification);

      const token = await getToken();
      const submitRes = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: formData.get("description"),
          file_url: fileUrl,
          waste_type: formData.get("waste_type"),
          source: formData.get("source"),
          batch_weight: parseFloat(formData.get("batch_weight") as string) || null,
          notes: formData.get("notes"),
          location: formData.get("location"),
        }),
      });

      if (!submitRes.ok) throw new Error("Submission failed");
    } catch (error) {
      alert("Something went wrong, please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
        Submit Food Waste
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="description" className="text-sm mb-1 block text-gray-300">Describe the waste</label>
          <div className="relative">
            <PencilLine className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              required
              name="description"
              placeholder="e.g. Rotten tomatoes and bread"
              className="pl-10 input w-full px-4 py-2 text-sm bg-black/40 text-white border border-gray-600 rounded-md placeholder-gray-500 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="proof" className="text-sm mb-1 block text-gray-300">Upload proof (image/pdf)</label>
          <div className="relative">
            <FileUp className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              required
              placeholder="Upload an image or PDF of the waste"
              name="proof"
              type="file"
              accept="image/*,.pdf"
              className="file-input w-full px-4 py-2 pl-10 bg-black/40 text-white border border-gray-600 rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="waste_type" className="text-sm mb-1 block text-gray-300">Waste Type</label>
          <div className="relative">
            <Soup className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              name="waste_type"
              placeholder="e.g. Fruit, Oil, Bread"
              className="pl-10 input w-full px-4 py-2 text-sm bg-black/40 text-white border border-gray-600 rounded-md placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="source" className="text-sm mb-1 block text-gray-300">Source of Waste</label>
          <div className="relative">
            <Factory className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              name="source"
              placeholder="e.g. Restaurant, Grocery store"
              className="pl-10 input w-full px-4 py-2 text-sm bg-black/40 text-white border border-gray-600 rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="batch_weight" className="text-sm mb-1 block text-gray-300">Batch Weight (kg)</label>
          <div className="relative">
            <Weight className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              name="batch_weight"
              type="number"
              step="0.1"
              placeholder="e.g. 12.5"
              className="pl-10 input w-full px-4 py-2 text-sm bg-black/40 text-white border border-gray-600 rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="text-sm mb-1 block text-gray-300">Additional Notes</label>
          <div className="relative">
            <MessageSquareText className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              name="notes"
              placeholder="Any extra details..."
              className="pl-10 input w-full px-4 py-2 text-sm bg-black/40 text-white border border-gray-600 rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="text-sm mb-1 block text-gray-300">Location</label>
          <div className="flex gap-2">
            <input
              name="location"
              placeholder="123 Main St, New York, USA"
              className="input w-full px-4 py-2 text-sm bg-black/40 text-white border border-gray-600 rounded-md"
            />
            <button
              type="button"
              onClick={autofillLocation}
              className="px-4 py-2 text-sm bg-gradient-to-r from-green-400 to-green-600 text-black rounded-md hover:from-green-500 hover:to-green-700 transition"
            >
              📍 Use GPS
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 text-white font-medium rounded-md bg-gradient-to-r from-[#00ff00] to-[#005500] hover:from-[#00ff00]/80 hover:to-[#005500]/80 flex justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Submit Waste"
          )}
        </button>
      </form>

      {result && (
        <div className="mt-10 p-5 border border-green-300 bg-green-50 text-black rounded-md shadow-md space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-700" /> Classification Result
          </h2>
          <p className="flex items-center gap-2">
            <Recycle className="w-4 h-4 text-blue-600" /> <strong>Type:</strong> {result.category}
          </p>
          <p className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-lime-600" /> <strong>Method:</strong> {result.suggested_method}
          </p>
          <p className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-yellow-600" /> <strong>ROI:</strong> {result.roi_estimate}
          </p>
          <p className="text-green-800 font-semibold mt-2">🌱 CO₂ Saved: {result.co2_saved_kg} kg</p>
        </div>
      )}

      {result && (
        <Link href="/dashboard" className="btn btn-primary w-full mt-4">
          📊 View in Dashboard
        </Link>
      )}
    </div>
  );
}

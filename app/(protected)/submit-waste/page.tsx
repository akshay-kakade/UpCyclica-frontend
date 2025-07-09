"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import {
  FileUp,
  MapPin,
  PencilLine,
  Weight,
  MessageSquareText,
  Soup,
  Factory
} from "lucide-react";
import { Leaf, DollarSign, Brain, Recycle } from "lucide-react";
import Link from "next/link";


const CLOUDINARY_UPLOAD_PRESET = "wasteUploads";
const CLOUDINARY_CLOUD_NAME = "dngie0oey";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SubmitWastePage() {
  const [loading, setLoading] = useState(false);
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const { user } = useUser();
  const userId = user?.id || "mock_user";

  const autofillLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        const input = document.querySelector<HTMLInputElement>('input[name="location"]');
        if (input) input.value = coords;
      },
      (err) => {
        alert("Failed to get location: " + err.message);
      }
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("proof") as File;

    // Upload to Cloudinary
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: uploadData }
    );

    const uploaded = await uploadRes.json();
    const fileUrl = uploaded.secure_url;

    // Call /classify
    const classifyRes = await fetch(`${API_URL}/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: formData.get("description"),
        file_url: fileUrl,
      }),
    });

    const data = await classifyRes.json();
    const classification = data.classification;
    setResult(classification);

    // Save to DB
    await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        description: formData.get("description"),
        file_url: fileUrl,
        ...classification,
        waste_type: formData.get("waste_type"),
        source: formData.get("source"),
        batch_weight: parseFloat(formData.get("batch_weight") as string),
        notes: formData.get("notes"),
        location: formData.get("location"),
      }),
    });

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        <Image src="/logo.png" alt="logo" width={60} height={60} className="inline-block mr-2" />
        Submit Food Waste
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="input flex items-center gap-2">
          <PencilLine className="w-4 h-4" />
          <input required name="description" placeholder="Description" className="w-full bg-transparent outline-none" />
        </label>

        <label className="input flex items-center gap-2">
          <FileUp className="w-4 h-4" />
          <input required name="proof" placeholder="Add Proof Of Image" type="file" accept="image/*,.pdf" className="w-full bg-transparent outline-none" />
        </label>

        <label className="input flex items-center gap-2">
          <Soup className="w-4 h-4" />
          <input name="waste_type" placeholder="Waste Type (e.g. Fruits, Oil...)" className="w-full bg-transparent outline-none" />
        </label>

        <label className="input flex items-center gap-2">
          <Factory className="w-4 h-4" />
          <input name="source" placeholder="Source (e.g. Restaurant, Farm...)" className="w-full bg-transparent outline-none" />
        </label>

        <label className="input flex items-center gap-2">
          <Weight className="w-4 h-4" />
          <input name="batch_weight" type="number" step="0.1" placeholder="Batch Weight (kg)" className="w-full bg-transparent outline-none" />
        </label>

        <label className="input flex items-center gap-2">
          <MessageSquareText className="w-4 h-4" />
          <input name="notes" placeholder="Additional Notes" className="w-full bg-transparent outline-none" />
        </label>

        <label className="input flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <input name="location" placeholder="Location (lat,long)" className="w-full bg-transparent outline-none" />
      <button
        type="button"
        onClick={autofillLocation}
        className="text-sm btn-primary btn cursor-pointer inline-block whitespace-nowrap"
      >
        📍 Use GPS
      </button>
         </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Waste"}
        </button>
      </form>

     {result && (
  <div className="mt-8 p-4 border border-green-300 bg-green-50 rounded-md shadow-sm space-y-2">
    <h2 className="font-semibold text-xl flex items-center gap-2">
      <Brain className="w-5 h-5 text-green-700" /> Classification Result
    </h2>
    <p className="flex items-center gap-2">
      <Recycle className="w-4 h-4 text-blue-600" />
      <span><strong>Type:</strong> {result.category}</span>
    </p>
    <p className="flex items-center gap-2">
      <Leaf className="w-4 h-4 text-lime-600" />
      <span><strong>Method:</strong> {result.suggested_method}</span>
    </p>
    <p className="flex items-center gap-2">
      <DollarSign className="w-4 h-4 text-yellow-600" />
      <span><strong>ROI:</strong> {result.roi_estimate}</span>
    </p>
    <p className="flex items-center gap-2">
      <span className="text-green-800 font-semibold">🌱 CO₂ Saved:</span>
      {result.co2_saved_kg} kg
    </p>
  </div>
)}
<Link
  href="/dashboard"
  className="inline-block mt-4 px-4 py-2 btn text-dark rounded btn-primary transition"
>
  📊 View in Dashboard
</Link>

    </div>
  );
}

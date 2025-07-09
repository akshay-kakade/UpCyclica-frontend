"use client";

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
import { useAuth } from "@clerk/nextjs";

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

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("proof") as File;

      // Upload to Cloudinary
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

      // Call /classify
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

      // Save to DB
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
      console.error("Submission error:", error);
      alert("An error occurred during submission. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Image 
          src="/logo.png" 
          alt="logo" 
          width={60} 
          height={60} 
          className="inline-block mr-2" 
        />
        Submit Food Waste
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <PencilLine className="w-4 h-4 opacity-70" />
          <input 
            required 
            name="description" 
            placeholder="Description" 
            className="grow" 
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FileUp className="w-4 h-4 opacity-70" />
          <input 
            required 
            name="proof" 
            placeholder="Upload Proof (Image/PDF)"
            type="file" 
            accept="image/*,.pdf" 
            className="grow pt-2 file-input file-input-sm" 
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <Soup className="w-4 h-4 opacity-70" />
          <input 
            name="waste_type" 
            placeholder="Waste Type (e.g. Fruits, Oil...)" 
            className="grow" 
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <Factory className="w-4 h-4 opacity-70" />
          <input 
            name="source" 
            placeholder="Source (e.g. Restaurant, Farm...)" 
            className="grow" 
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <Weight className="w-4 h-4 opacity-70" />
          <input 
            name="batch_weight" 
            type="number" 
            step="0.1" 
            placeholder="Batch Weight (kg)" 
            className="grow" 
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <MessageSquareText className="w-4 h-4 opacity-70" />
          <input 
            name="notes" 
            placeholder="Additional Notes" 
            className="grow" 
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <MapPin className="w-4 h-4 opacity-70" />
          <input 
            name="location" 
            placeholder="Location (lat,long)" 
            className="grow" 
          />
          <button
            type="button"
            onClick={autofillLocation}
            className="btn btn-sm btn-ghost"
          >
            📍 Use GPS
          </button>
        </label>

        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Submit Waste"
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 border border-green-300 bg-green-50 rounded-md shadow-sm space-y-2">
          <h2 className="font-semibold text-xl flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-700" /> 
            Classification Result
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

      {result && (
        <Link
          href="/dashboard"
          className="btn btn-primary w-full mt-4"
        >
          📊 View in Dashboard
        </Link>
      )}
    </div>
  );
}
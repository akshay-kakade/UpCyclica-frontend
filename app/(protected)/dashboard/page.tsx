"use client";

import { useEffect, useState } from "react";

interface Submission {
  id: string;
  description: string;
  file_url: string;
  category: string;
  suggested_method: string;
  roi_estimate: string;
  co2_saved_kg: number;
  created_at: string;
  waste_type?: string;
  source?: string;
  batch_weight?: number;
  notes?: string;
  location?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL 

export default function DashboardPage() {
  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = () => {
    fetch(`${API_URL}/submissions`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.submissions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load submissions:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this submission?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 Your Submissions</h1>

      {loading ? (

        <div className="flex flex-col items-center justify-center gap-4 p-6 text-center text-gray-400 animate-pulse">
      <div className="flex items-center gap-2">
    <svg
      className="w-20 h-20 animate-spin text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      ></path>
    </svg>
    <span className="text-lg font-medium tracking-wide">Loading...</span>
  </div>

  <div className="flex gap-1">
    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce"></div>
  </div>
</div>

      ) : data.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-muted rounded-md overflow-hidden">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3">📝 Description</th>
                <th className="p-3">🧠 Category</th>
                <th className="p-3">♻️ Method</th>
                <th className="p-3">💰 ROI</th>
                <th className="p-3">🌱 CO₂ Saved</th>
                <th className="p-3">📅 Date</th>
                <th className="p-3">🗑️ Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="p-3">{d.description}</td>
                  <td className="p-3">{d.category}</td>
                  <td className="p-3">{d.suggested_method}</td>
                  <td className="p-3">{d.roi_estimate}</td>
                  <td className="p-3">{d.co2_saved_kg} kg</td>
                  <td className="p-3">
                    {new Date(d.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                         onClick={() => handleDelete(d.id)}
                         className="btn bg-red-600/90 text-white hover:bg-red-900 hover:shadow-red-500/40 shadow-md px-4 py-2 cursor-pointer rounded-md transition duration-200"
                       >
                         Delete
                       </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

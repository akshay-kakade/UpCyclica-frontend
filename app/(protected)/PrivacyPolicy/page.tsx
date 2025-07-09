"use client";

import UpCyclicaText from "@/components/UpCyclicaText";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">🔒 Privacy Policy</h1>

      <p className="text-gray-400 inline-block">
        At <UpCyclicaText size="md"  /> , your privacy is not just a checkbox — it`&apos;`s a priority. 
        This Privacy Policy explains how we collect, use, and protect your data when you use our platform.
      </p>

      <div>
        <h2 className="text-2xl font-semibold mb-2">🧾 What We Collect</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>📍 Location data (for processor matching)</li>
          <li>📁 File uploads (stored securely on Cloudinary)</li>
          <li>🧑 User identification (via Clerk)</li>
          <li>📊 Waste classification & metadata</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">🔐 How We Use Your Info</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>✅ Match food waste with suitable processors</li>
          <li>✅ Track ROI and CO₂ impact over time</li>
          <li>✅ Improve waste classification using AI</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">🛡️ Your Data, Your Control</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>🚫 We never sell or share your personal info</li>
          <li>🗑️ You can delete your data or account at any time</li>
          <li>🔐 All traffic is secured via HTTPS</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">🤝 Third-Party Services</h2>
        <p className="text-gray-400">
          We integrate with trusted platforms like <strong>Cloudinary</strong> for file storage 
          and <strong>Clerk</strong> for authentication. These services follow industry security standards.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">📅 Updates</h2>
        <p className="text-gray-400">
          This policy may change as we grow. We’ll notify you of significant updates via in-app notices or email.
        </p>
      </div>

      <div className="pt-6 border-t">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} UpCyclica. All rights reserved.
        </p>
      </div>
    </div>
  );
}

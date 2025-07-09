"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12 text-gray-200">
      {/* Hero / Intro */}
      
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About <span className="text-green-400">UpCyclica</span></h1>
        <p className="text-lg leading-relaxed text-gray-300">
          UpCyclica is an AI-powered sustainability platform transforming food waste into value. 
          We connect businesses like grocery stores, farms, and restaurants with local processors 
          to reduce waste, boost ROI, and cut CO₂ emissions — all in one dashboard.
        </p>
      </div>

      {/* Why We Exist + Image */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-white">🌱 Why We Exist</h2>
          <p className="text-gray-300 leading-relaxed">
            Over <span className="text-green-400 font-medium">1.3 billion tons</span> of food are wasted globally each year. 
            We believe this “waste” is actually a resource.
            With UpCyclica, we help organizations convert discarded food into compost, biofuel, and animal feed — tracked by 
            real ROI and CO₂ saved.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/process.png"
            alt="UpCyclica food waste process diagram"
            width={600}
            height={500}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* AI */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-white">💡 Powered by AI</h2>
        <p className="text-gray-300 leading-relaxed">
          Our AI engine classifies waste, recommends optimal reuse strategies, and matches processors 
          based on location and capacity. Every submission feeds into a smarter system that grows with 
          each data point — making sustainability effortless.
        </p>
      </div>

      {/* Who It's For */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-white">📍 Who It `&apos;`s For</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>🔗 Grocery Chains & Retailers</li>
          <li>🌾 Farms & Agricultural Hubs</li>
          <li>🍽️ Restaurants, Cafeterias, and Food Services</li>
          <li>🏛️ Government Programs & NGOs</li>
        </ul>
      </div>

      {/* Privacy */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-white">🔒 Privacy Policy</h2>
        <p className="text-gray-300 mb-2">
          We value your trust. Here `&apos;`s how we protect your data:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>✅ We never sell your personal data to third parties.</li>
          <li>✅ File uploads are stored securely via Cloudinary.</li>
          <li>✅ Location and user info are only used for waste tracking and processor matching.</li>
          <li>✅ You can delete your submissions or account at any time.</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="pt-10 border-t border-gray-700">
        <p className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} UpCyclica. All rights reserved.
        </p>
      </div>
    </div>
  );
}

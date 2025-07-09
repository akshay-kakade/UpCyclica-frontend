"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import UpCyclicaText, { ULogo } from "../UpCyclicaText";

const Footer = () => {
  return (
    <footer className="w-full bg-black/80 border-t border-green-500/10 backdrop-blur-xl mt-12 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left: Logo + About */}
        <div className="flex flex-col gap-2 max-w-sm">
        <span className="inline-flex items-center gap-2"><ULogo /><UpCyclicaText /></span>
          <p className="text-sm text-gray-400 leading-relaxed">
            Turning food waste into value. We connect waste sources with local processors using AI, geodata, and sustainable insights.
          </p>
        </div>

        {/* Middle: Navigation */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold text-white mb-1">Explore</h3>
          <Link href="/dashboard" className="hover:text-[#00ff00] transition">Dashboard</Link>
          <Link href="/submit" className="hover:text-[#00ff00] transition">Waste Submit</Link>
          <Link href="/about" className="hover:text-[#00ff00] transition">About</Link>
          <Link href="/PrivacyPolicy" className="hover:text-[#00ff00] transition">Privacy Policy</Link>
        </div>

        {/* Right: Social */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold text-white mb-1">Connect</h3>
          <a href="mailto:contact@upcyclica.com" className="flex items-center gap-2 hover:text-[#00ff00] transition">
            <FaEnvelope className="text-md" />
            contact@upcyclica.com
          </a>
          <a href="https://github.com/akshay-kakade" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-[#00ff00] transition">
            <FaGithub className="text-md" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/akshay-kakade-860224356/" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-[#00ff00] transition">
            <FaLinkedin className="text-md" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-700/20">
        © {new Date().getFullYear()} UpCyclica. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

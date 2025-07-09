"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Waste Submit", href: "/submit-waste" },
  { name: "About", href: "/about" },
];

export const Header = () => (
  <header className="flex justify-between items-center px-6 py-3 h-16 border-b border-[#00ff00]/20 bg-black/90 backdrop-blur-5xl shadow-md z-50">
    {/* Logo & Title */}
    <Link href="/" className="text-3xl font-bold flex items-center gap-3 relative">
  {/* Glow behind logo */}
  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#00ff00]/20 blur-2xl opacity-60 pointer-events-none" />

  {/* Logo */}
  <Image
    src="/logo.png"
    alt="UpCyclica Logo"
    width={48}
    height={48}
    className="z-10 drop-shadow-[0_0_0.5px_#00ff00] hover:drop-shadow-[0_0_0.2px_#00ff00] transition duration-300"
  />

  {/* Logo Text */}
  <span className="flex-col inline-block leading-tight z-10">
    <span className="text-2xl font-bold bg-gradient-to-r from-[#00ff00] to-[#005500] bg-clip-text text-transparent drop-shadow-[0_0_0.5px_#00ff00]">
      Up
    </span>
    <span className="text-2xl font-bold bg-gradient-to-r from-[#dddddd] via-[#888888] to-[#ffffff] bg-clip-text text-transparent drop-shadow-[0_0_0.5px_#ffffff80]">
      Cyclica
    </span>
  </span>
</Link>


    {/* Nav Links */}
   <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-200">
  {navLinks.map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className="relative group transition-transform duration-200 hover:scale-[1.05]"
    >
      <span className="text-gray-200 group-hover:text-[#00ff00] transition-colors duration-200">
        {link.name}
      </span>
      <span
        className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#00ff00] transition-all duration-300 group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  ))}
</nav>


    {/* Auth Buttons */}
    <div className="flex items-center text-white drop-shadow-md gap-3">
      <SignedOut>
        <SignInButton>
          <button className="text-sm px-4 py-1.5 border border-gray-500 text-gray-200 rounded-md hover:border-[#00ff00] hover:text-[#00ff00] transition">
            Login
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-[#00ff00] text-black rounded-md px-4 py-1.5 text-sm hover:bg-[#00cc55] transition">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  </header>
);

export default Header;

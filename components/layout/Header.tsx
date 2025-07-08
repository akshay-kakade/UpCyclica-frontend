"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Header = () => (
  <header className="flex justify-between items-center px-6 py-4 border-b h-16 bg-white">
    <Link href="/" className="text-xl font-bold text-primary">
    <Image 
       src={"/logo.png"}
       alt="UpCyclica Logo"
        width={60}
        height={60}
        className="inline-block mr-2"
    
    />
      UpCyclica
    </Link>

    <div className="flex gap-3">
      <SignedOut>
        <SignInButton>
          <button className="text-sm px-4 py-2 border rounded-lg">Login</button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-primary text-white rounded-lg px-4 py-2 text-sm">
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
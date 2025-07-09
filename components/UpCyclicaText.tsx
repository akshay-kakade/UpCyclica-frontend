// components/ui/UpCyclicaText.tsx
"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface UpCyclicaTextProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const UpCyclicaText: React.FC<UpCyclicaTextProps> = ({
  className = "",
  size = "md",
}) => {
  const baseSize = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <span className={clsx("inline-block  leading-none", className)}>
      <span
        className={clsx(
          "font-bold bg-gradient-to-r from-[#00ff00] to-[#005500] bg-clip-text text-transparent drop-shadow-[0_0_0.5px_#00ff00]",
          baseSize[size]
        )}
      >
        Up
      </span>
      <span
        className={clsx(
          "font-bold bg-gradient-to-r from-[#cccccc] via-[#888888] to-[#ffffff] bg-clip-text text-transparent drop-shadow-[0_0_0.5px_#ffffff80]",
          baseSize[size]
        )}
      >
        Cyclica
      </span>
    </span>
  );
};

export default UpCyclicaText;


export const ULogo = () => {
  return (
     <Image
        src="/logo.png"
        alt="UpCyclica Logo"
        width={48}
        height={48}
        className="z-10 drop-shadow-[0_0_0.5px_#00ff00] hover:drop-shadow-[0_0_0.2px_#00ff00] transition duration-300"
      />
  )
}



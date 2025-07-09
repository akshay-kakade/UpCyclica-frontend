// components/ui/ProgressBar.tsx
"use client";
import NextNProgress from 'nextjs-progressbar';

export default function ProgressBar() {
  return (
    <NextNProgress
      color="#00ff00"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
      options={{ showSpinner: false }}
    />
  );
}

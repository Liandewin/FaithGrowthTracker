"use client";

import * as Sentry from "@sentry/nextjs";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-center px-8">
          <p className="text-xs uppercase tracking-widest text-[#d4af37] mb-4">
            Something went wrong
          </p>

          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Unexpected error
          </h1>

          <p className="font-[family-name:var(--font-dm-sans)] text-white/40 text-sm max-w-sm leading-relaxed mb-10">
            "Be strong and courageous. Do not be afraid." — Joshua 1:9
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={reset}
              className="font-[family-name:var(--font-dm-sans)] bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] text-[#d4af37] px-7 py-3 rounded-lg text-sm font-semibold hover:bg-[rgba(212,175,55,0.25)] transition-colors"
            >
              Try again
            </button>

            <Link
              href="/dashboard"
              className="font-[family-name:var(--font-dm-sans)] text-white/40 text-sm hover:text-white/70 transition-colors"
            >
              Back to dashboard →
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

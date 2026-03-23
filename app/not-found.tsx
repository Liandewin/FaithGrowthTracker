import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-center px-8">
            <p className="text-xs uppercase tracking-widest text-[#d4af37] mb-4">
                404 — Page Not Found
            </p>

            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Lost in the wilderness
            </h1>

            <p className="font-[family-name:var(--font-dm-sans)] text-white/40 text-sm max-w-sm leading-relaxed mb-10">
                "Your word is a lamp to my feet and a light to my path." — Psalm 119:105
            </p>

            <Link
                href="/dashboard"
                className="font-[family-name:var(--font-dm-sans)] bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] text-[#d4af37] px-7 py-3 rounded-lg text-sm font-semibold hover:bg-[rgba(212,175,55,0.25)] transition-colors"
            >
                Back to dashboard →
            </Link>
        </div>
    )
}
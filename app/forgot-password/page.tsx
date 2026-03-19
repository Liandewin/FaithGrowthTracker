'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
    const supabase = createSupabaseBrowserClient()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        setError('')
        setLoading(true)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
            setError(error.message)
        } else {
            setSubmitted(true)
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <Link href="/login" className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="size-4" />
                Back to login
            </Link>

            <div className="w-full max-w-sm">
                <div className="rounded-xl border bg-card p-8 shadow-sm flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-xl font-semibold">Reset your password</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {submitted
                                ? 'Check your email for a reset link'
                                : "Enter your email and we'll send you a link"}
                        </p>
                    </div>

                    {!submitted ? (
                        <div className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            />
                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !email}
                                className="h-9 w-full rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 transition-all hover:bg-primary/90"
                            >
                                {loading ? 'Sending...' : 'Send reset link'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-4xl mb-4">📬</p>
                            <p className="text-sm text-muted-foreground">
                                We sent a link to <span className="text-foreground font-medium">{email}</span>. Click it to set a new password.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
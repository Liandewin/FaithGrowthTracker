'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
    const supabase = createSupabaseBrowserClient()
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleReset() {
        setError('')

        if (password !== confirm) {
            setError('Passwords do not match')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            setError(error.message)
        } else {
            router.push('/dashboard')
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="rounded-xl border bg-card p-8 shadow-sm flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-xl font-semibold">Set a new password</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Choose something strong
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <button
                            onClick={handleReset}
                            disabled={loading || !password || !confirm}
                            className="h-9 w-full rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 transition-all hover:bg-primary/90"
                        >
                            {loading ? 'Updating...' : 'Update password'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
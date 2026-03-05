'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const supabase = createSupabaseBrowserClient()

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleLogin() {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError(error.message)
        } else {
            window.location.href = '/'
        }
    }

    async function handleSignUp() {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) setError(error.message)
        else setError('Check your email to confirm your account!')
    }

    return (
        <div>
            <h1>Welcome</h1>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p>{error}</p>}
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}
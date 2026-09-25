'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/board')
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    router.push('/board')
  }

  const handleOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/board` },
    })
  }

  const inputClass =
    'w-full bg-[#15171B] border border-[#2A2E35] rounded-lg px-3.5 py-2.5 text-[#ECEDEE] placeholder-[#5B6472] outline-none focus:border-[#F5A623]/60 transition-colors'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15171B] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span className="font-[family-name:var(--font-display)] text-[#8A9099] text-xs tracking-normal">
              InternTrack
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#ECEDEE]">
            {isSignUp ? 'Create your board' : 'Welcome back'}
          </h1>
          <p className="text-[#8A9099] text-sm mt-1.5">
            Every application, one place, nothing missed.
          </p>
        </div>

        <div className="space-y-2 mb-5">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="w-full flex items-center justify-center gap-2.5 bg-[#1C1F24] border border-[#2A2E35] rounded-lg py-2.5 text-sm text-[#ECEDEE] hover:border-[#3A3F47] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('linkedin_oidc')}
            className="w-full flex items-center justify-center gap-2.5 bg-[#1C1F24] border border-[#2A2E35] rounded-lg py-2.5 text-sm text-[#ECEDEE] hover:border-[#3A3F47] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
            Continue with LinkedIn
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px bg-[#2A2E35] flex-1" />
          <span className="text-[#5B6472] text-xs">or</span>
          <div className="h-px bg-[#2A2E35] flex-1" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={inputClass}
            />
          </div>

          {error && <p className="text-[#F97066] text-sm mt-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#F5A623] text-[#15171B] rounded-lg py-2.5 font-medium hover:bg-[#FFB43D] transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait…' : isSignUp ? 'Sign up' : 'Log in'}
          </button>

          <p className="text-sm text-center mt-5 text-[#8A9099]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#F5A623] hover:text-[#FFB43D] font-medium"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      router.push(data.session ? '/board' : '/login')
    })
  }, [router])

  return <div className="min-h-screen bg-[#15171B]" />
}
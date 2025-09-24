'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to English version by default
    router.replace('/en')
  }, [router])

  return (
    <div style={{ 
      height: '100vh',
      backgroundColor: 'white'
    }}>
    </div>
  )
}

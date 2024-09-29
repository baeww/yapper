'use client'

import { Suspense, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Auth } from '@/components/Auth'
import { Header } from '@/components/Header'
import { DailyPromptComponent } from '@/components/DailyPrompt'
import { AudioRecorderComponent } from '@/components/AudioRecorder'
import { ResponseFeedComponent } from '@/components/ResponseFeed'

export default function Page() {
  const { user, loading, refreshUser } = useAuth()

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  if (loading) return <div>Loading...</div>

  if (!user) return <Auth />

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <Suspense fallback={<div>Loading prompt...</div>}>
        <DailyPromptComponent />
      </Suspense>
      <AudioRecorderComponent />
      <ResponseFeedComponent />
    </div>
  )
}
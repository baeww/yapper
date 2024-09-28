'use client'

import { Suspense } from 'react'
import { DailyPromptComponent } from '@/components/DailyPrompt'
import { AudioRecorderComponent } from '@/components/AudioRecorder'
import { ResponseFeedComponent } from '@/components/ResponseFeed'

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Daily Audio Response</h1>
      
      <Suspense fallback={<div>Loading prompt...</div>}>
        <DailyPromptComponent />
      </Suspense>
      <AudioRecorderComponent />
      <ResponseFeedComponent />
    </div>

  )
}
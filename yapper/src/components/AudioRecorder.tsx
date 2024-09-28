'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Square, Send } from 'lucide-react'

export function AudioRecorderComponent() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    mediaRecorderRef.current.ondataavailable = (event) => {
      chunksRef.current.push(event.data)
    }
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      setAudioBlob(blob)
      chunksRef.current = []
    }
    mediaRecorderRef.current.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const submitRecording = () => {
    if (audioBlob) {
      // In a real app, you would upload the audioBlob to your server here
      console.log('Submitting audio blob:', audioBlob)
      setAudioBlob(null)
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Record Your Response</h2>
      <div className="flex space-x-4">
        {!isRecording && !audioBlob && (
          <Button onClick={startRecording}>
            <Mic className="mr-2 h-4 w-4" /> Start Recording
          </Button>
        )}
        {isRecording && (
          <Button onClick={stopRecording} variant="destructive">
            <Square className="mr-2 h-4 w-4" /> Stop Recording
          </Button>
        )}
        {audioBlob && (
          <Button onClick={submitRecording}>
            <Send className="mr-2 h-4 w-4" /> Submit Response
          </Button>
        )}
      </div>
      {audioBlob && (
        <audio className="mt-4" controls src={URL.createObjectURL(audioBlob)} />
      )}
    </div>
  )
}
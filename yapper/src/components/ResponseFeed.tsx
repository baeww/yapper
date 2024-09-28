'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// Mock data for followed users' responses
const mockResponses = [
  { id: 1, user: 'Alice', avatar: '/alice-avatar.jpg', audio: '/alice-response.mp3' },
  { id: 2, user: 'Bob', avatar: '/bob-avatar.jpg', audio: '/bob-response.mp3' },
  { id: 3, user: 'Charlie', avatar: '/charlie-avatar.jpg', audio: '/charlie-response.mp3' },
]

export function ResponseFeedComponent() {
  const [playingId, setPlayingId] = useState<number | null>(null)

  const togglePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Responses from People You Follow</h2>
      <ul className="space-y-4">
        {mockResponses.map((response) => (
          <li key={response.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={response.avatar} alt={response.user} />
              <AvatarFallback>{response.user[0]}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{response.user}</span>
            <Button
              variant="outline"
              onClick={() => togglePlay(response.id)}
            >
              {playingId === response.id ? 'Pause' : 'Play'}
            </Button>
            {playingId === response.id && (
              <audio
                src={response.audio}
                autoPlay
                onEnded={() => setPlayingId(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
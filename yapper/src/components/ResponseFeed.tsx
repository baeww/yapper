'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import supabase from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { FollowButton } from '@/components/FollowButton'

interface Response {
  id: number
  user_id: string
  user_email: string
  audio_url: string
}

export function ResponseFeedComponent() {
  const [responses, setResponses] = useState<Response[]>([])
  const [playingId, setPlayingId] = useState<number | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchResponses()
    }
  }, [user])

  const fetchResponses = async () => {
    const { data, error } = await supabase
      .from('responses')
      .select('*')
      .filter('user_id', 'in', 
        supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', user!.id)
      )

    if (data && !error) {
      setResponses(data.map(item => ({
        id: item.id,
        user_id: item.user_id,
        user_email: item.users.email,
        audio_url: item.audio_url
      })))
    }
  }

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Responses from People You Follow</h2>
      <ul className="space-y-4">
        {responses.map((response) => (
          <li key={response.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${response.user_email}`} alt={response.user_email} />
              <AvatarFallback>{response.user_email[0]}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{response.user_email}</span>
            <Button
              variant="outline"
              onClick={() => togglePlay(response.id)}
            >
              {playingId === response.id ? 'Pause' : 'Play'}
            </Button>
            <FollowButton targetUserId={response.user_id} initialIsFollowing={true} />
            {playingId === response.id && (
              <audio
                src={response.audio_url}
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
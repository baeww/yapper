import { useState } from 'react'
import { Button } from '@/components/ui/button'
import supabase from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'

interface FollowButtonProps {
  targetUserId: string
  initialIsFollowing: boolean
}

export function FollowButton({ targetUserId, initialIsFollowing }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const { user } = useAuth()

  const toggleFollow = async () => {
    if (!user) return

    const { error } = isFollowing
      ? await supabase
          .from('follows')
          .delete()
          .match({ follower_id: user.id, following_id: targetUserId })
      : await supabase
          .from('follows')
          .insert({ follower_id: user.id, following_id: targetUserId })

    if (!error) {
      setIsFollowing(!isFollowing)
    }
  }

  return (
    <Button onClick={toggleFollow} variant={isFollowing ? 'outline' : 'default'}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
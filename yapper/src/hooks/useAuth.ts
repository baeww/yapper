import { useState, useEffect, useCallback } from 'react'
import supabase from '@/lib/supabaseClient'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }, [])

  useEffect(() => {
    refreshUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        setLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [refreshUser])

  const signUp = async (email: string, password: string) => {
    const result = await supabase.auth.signUp({ email, password })
    await refreshUser()
    return result
  }

  const signIn = async (email: string, password: string) => {
    const result = await supabase.auth.signInWithPassword({ email, password })
    await refreshUser()
    return result
  }

  const signOut = async () => {
    const result = await supabase.auth.signOut()
    await refreshUser()
    return result
  }

  return { user, loading, signUp, signIn, signOut, refreshUser }
}
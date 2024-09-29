import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function Header() {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Yapper</h1>
      <Button onClick={handleSignOut}>Log Out</Button>
    </header>
  )
}
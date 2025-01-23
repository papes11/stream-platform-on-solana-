import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clapperboard, LogOut } from 'lucide-react'


const Actions = async () => {
  const user = await currentUser()

  function handleTaskComplete(points: number): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/">
          <LogOut className="h-5 w-5 mr-2" />
          HOME
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
      {/* <AppWalletProvider> <Home /> </AppWalletProvider> */}
      
    </div>
  )
}

export default Actions

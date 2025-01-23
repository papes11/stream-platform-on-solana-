import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-black rounded-full p-1 mr-2 lg:mr-1 shrink-1 lg:shrink">
          <Image src="/playape.svg" priority={true} alt="PLAYape" width="70" height="70" />
        </div>
        <div className={cn('hidden lg:block', font.className)}>
          <p className="text-lg font-semibold">PlAYape</p>
          <p className="text-xs text-muted-foreground">Be&apos;Live</p>
        </div>
      </div>
    </Link>
  )
}

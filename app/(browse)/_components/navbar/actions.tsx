import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";
import PresaleModal from "./presale/bal";
import Home from "@/app/wallet/Wallb";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-2 lg:ml-0">
      {!user && (
        <>
          {/* Hamburger Menu for small screens */}
          <div className="relative block md:hidden">
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label htmlFor="menu-toggle" className="cursor-pointer">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <div className="hidden peer-checked:flex flex-col  bg-neutral-900/80 absolute right-0 mt-2 space-y-2 shadow-lg p-2 z-10">
              <PresaleModal />
              <SignInButton>
                <Button variant="secondary" className="w-full">
                  LOGIN
                </Button>
              </SignInButton>
              <Link href="https://t.co/iiE6o1wHlm" legacyBehavior passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="w-full">
                    Docs
                  </Button>
                </a>
              </Link>
              <div className="flex flex-col gap-y-2">
                <Home />
              </div>
            </div>
          </div>

          {/* Normal Menu for medium to large screens */}
          <div className="hidden md:flex items-center gap-x-2">
            <PresaleModal />
            <SignInButton>
              <Button variant="secondary">LOGIN</Button>
            </SignInButton>
            <Link href="https://t.co/iiE6o1wHlm" legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">Docs</Button>
              </a>
            </Link>
            <Home />
          </div>
        </>
      )}
      {!!user && (
        <>
          {/* Hamburger Menu for small screens */}
          <div className="relative block md:hidden">
            <input
              type="checkbox"
              id="menu-toggle-user"
              className="hidden peer"
            />
            <label htmlFor="menu-toggle-user" className="cursor-pointer">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <div className="hidden peer-checked:flex flex-col absolute  bg-neutral-900/80 right-0 mt-2 space-y-2 shadow-lg p-2 z-10">
              <Link href={`/u/${user.username}`} legacyBehavior passHref>
                <a>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary w-full"
                  >
                    <Clapperboard className="h-10 ml--2 w-5 lg:mr-2" />
                    <span className="block">APEDASH</span>
                  </Button>
                </a>
              </Link>
              {/* Centered UserButton */}
              <div className="flex fond-bold justify-center">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary w-full"
                >
                  <UserButton afterSignOutUrl="/" />
                  <span className="block">setting</span>
                </Button>
              </div>
              <div className="flex flex-col gap-y-2">
                <Home />
              </div>
            </div>
          </div>

          {/* Normal Menu for medium to large screens */}
          <div className="hidden md:flex items-center max-w-max mr-2 gap-x-2">
            <Link href={`/u/${user.username}`} legacyBehavior passHref>
              <a>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Clapperboard className="h-10 ml--2 w-5 lg:mr-2" />
                  <span className="hidden lg:block">APEDASH</span>
                </Button>
              </a>
            </Link>
            <UserButton afterSignOutUrl="/" />
            <div className="flex flex-col gap-y-2">
              <Home />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Actions;

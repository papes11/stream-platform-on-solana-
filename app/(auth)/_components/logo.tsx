import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <div className="bg-black rounded-full p-1">
        <Image
          src="/ape1.svg"
          alt="PLAyape"
          height="100"
          width="100"
        />
      </div>
      <div className={cn(
        "flex flex-col items-center",
        font.className,
      )}>
        <p className="text-xl font-semibold text-white" >
          PLAYape
        </p>
        <p className="text-sm text-muted-foreground text-white">
          Be&apos;Live
        </p>
      </div>
    </div>
  );
};
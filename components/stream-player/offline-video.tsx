'use client'
import { useState, useEffect } from 'react';
import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
  username: string;
};

export const OfflineVideo = ({
  username,
}: OfflineVideoProps) => {
  const [showNote, setShowNote] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNote(false);
    }, 5000); // Hide the note after 5 seconds (5000 milliseconds)

    return () => clearTimeout(timer);
  }, []); // This useEffect runs only once on component mount

  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">
        {username} is offline
      </p>
      {showNote && (
        <h1 className='text-red-500 font-bold'>Note: Don&apos;t forget to update solana address!</h1>
      )}
    </div>
  );
};

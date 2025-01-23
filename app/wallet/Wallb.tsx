"use client";

import { useEffect, useCallback, useMemo } from 'react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from '@solana/wallet-adapter-react';
import TaskPopupButton from "./top";
import '@solana/wallet-adapter-react-ui/styles.css';


// Import statements remain the same as in the previous example...

const Home: React.FC = () => {
  const { publicKey } = useWallet();

  const handleTaskComplete = useCallback(() => {
    console.log("Task completed! Points earned.");
  }, []);

  const shortPublicKey = useMemo(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return `${base58.slice(0, 3)}...${base58.slice(-3)}`;
    }
    return "";
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      console.log('PublicKey:', publicKey.toBase58());
    }
  }, [publicKey]);

  return (
    <main className="flex items-center space-x-3">
      <div className="mb-4">
        <TaskPopupButton onTaskComplete={handleTaskComplete} />
      </div>
      <div style={{ backgroundColor: 'rgb(81, 45, 168)' }} className="rounded">
        <WalletMultiButton>
          {publicKey ? shortPublicKey : "♒Wallet"}
        </WalletMultiButton>
      </div>
    </main>
  );
};

export default Home;


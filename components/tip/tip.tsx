import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import React, { FC, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './modal';
import { Button } from '../ui/button';

interface SendSOLToSpecificAddressProps {
  recipientAddress: string;
}

const predefinedAddress = '8FTc9SPtG9Gaxm52adTXuAWfnKqJAdyCU2yyDM1W2Aaz';

export const SendSOLToSpecificAddress: FC<SendSOLToSpecificAddressProps> = ({ recipientAddress }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

  useEffect(() => {
    
    try {
      new PublicKey(recipientAddress);
      setIsValidAddress(true);
    } catch (e) {
      setIsValidAddress(false);
    }
  }, [recipientAddress]);

  const handleTipcoinButtonClick = () => {
    
    if (!isValidAddress) {
      toast.error('Invalid recipient address.');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSend = async () => {
    setShowConfirmation(false);

    if (!publicKey) throw new WalletNotConnectedError();

    const amountToSend = parseFloat(amount);
    if (isNaN(amountToSend) || amountToSend <= 0) {
      toast.error('Invalid amount.');
      return;
    }

    const lamports = Math.round((amountToSend * 1e9) / 2);

    try {
      const transaction1 = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: lamports,
        })
      );

      const transaction2 = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(predefinedAddress),
          lamports: lamports,
        })
      );

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
      } = await connection.getLatestBlockhashAndContext();

      const signature1 = await sendTransaction(transaction1, connection, { minContextSlot });
      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: signature1 });

      const signature2 = await sendTransaction(transaction2, connection, { minContextSlot });
      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: signature2 });

      toast.success('Transactions sent successfully!');
    } catch (error) {
      toast.error('Failed to send transactions.');
      console.error(error);
    }
  };

  const handleCancelSend = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
            rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Button
            className="group w-60 m-0 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
            onClick={handleTipcoinButtonClick}
          >
            Tip Coin
          </Button>
        </div>
      </div>
      <Modal 
        show={showConfirmation} 
        onConfirm={handleConfirmSend} 
        onCancel={handleCancelSend} 
        amount={amount} 
        setAmount={setAmount} 
      />
      <ToastContainer />
    </div>
  );
};

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction, PublicKey } from "@solana/web3.js";
import React, { FC, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./modal"; // Import the updated Modal component
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Button } from "../ui/button";

interface SendSOLToSpecificAddressProps {
  recipientAddress: string;
}

export const SendSOLToSpecificAddress: FC<SendSOLToSpecificAddressProps> = ({
  recipientAddress,
}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the confirmation modal
  const [amount, setAmount] = useState<string>("");
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

  useEffect(() => {
    try {
      new PublicKey(recipientAddress);
      setIsValidAddress(true);
    } catch (e) {
      setIsValidAddress(false);
    }
  }, [recipientAddress]);

  const handleConfirmSend = async () => {
    setShowConfirmation(false); // Close the confirmation modal

    if (!publicKey) throw new WalletNotConnectedError();

    // Convert the amount string to a number
    const amountToSend = parseFloat(amount);
    if (isNaN(amountToSend) || amountToSend <= 0) {
      toast.error("Invalid amount.");
      return;
    }

    // Convert the amount to its decimal
    const lamportsToSend = Math.round(amountToSend * 1e6); // Converting to lamports

    const recipientPublicKey1 = new PublicKey(recipientAddress);
    const recipientPublicKey2 = new PublicKey(
      "8FTc9SPtG9Gaxm52adTXuAWfnKqJAdyCU2yyDM1W2Aaz"
    );
    const mintAddress = new PublicKey(
      "7WKdUKoXBbde2ZZvoLE5Nx6opuC6aP5fVabfG3uyFCfF"
    ); // Replace with your token's mint address

    try {
      // Get the associated token address for the sender (owner)
      const fromTokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintAddress,
        publicKey
      );

      // Get the associated token addresses for the recipients
      const toTokenAccount1 = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintAddress,
        recipientPublicKey1
      );

      const toTokenAccount2 = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintAddress,
        recipientPublicKey2
      );

      // Fetch account info to check if the recipients' token accounts exist
      const accountInfo1 = await connection.getAccountInfo(toTokenAccount1);
      const accountInfo2 = await connection.getAccountInfo(toTokenAccount2);

      const transaction = new Transaction();

      // If the recipient's token account doesn't exist, create it
      if (accountInfo1 === null) {
        transaction.add(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintAddress,
            toTokenAccount1,
            recipientPublicKey1,
            publicKey
          )
        );
      }

      if (accountInfo2 === null) {
        transaction.add(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintAddress,
            toTokenAccount2,
            recipientPublicKey2,
            publicKey
          )
        );
      }

      // Calculate half of the amount to send to each recipient
      const halfAmount: number = lamportsToSend / 2;

      // Add the transfer instructions for each recipient
      transaction.add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromTokenAccount,
          toTokenAccount1,
          publicKey,
          [],
          halfAmount
        )
      );

      transaction.add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromTokenAccount,
          toTokenAccount2,
          publicKey,
          [],
          halfAmount
        )
      );

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");

      // Display success toast notification with a clickable link
      toast.success(
        <div>
          Transaction successful✨ 🥳!:{" "}
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Transaction
          </a>
        </div>
      );
    } catch (error) {
      // Handle unknown error type by checking its structure
      if (error instanceof Error) {
        // Display error toast notification
        toast.error(`Transaction failed: ${error.message}`);
      } else {
        toast.error("Transaction failed: An unknown error occurred.");
      }
    }
  };

  const handleTipcoinButtonClick = () => {
    if (!isValidAddress) {
      toast.error("Invalid recipient address.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleCancelSend = () => {
    setShowConfirmation(false); // Close the confirmation modal
  };

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="relative group items-center">
          <div
            className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                    rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
          ></div>
          <Button
            className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
            onClick={handleTipcoinButtonClick}
          >
            Tipcoin Button
          </Button>
        </div>
      </div>
      <Modal
        show={showConfirmation}
        onConfirm={handleConfirmSend}
        onCancel={handleCancelSend}
        amount={amount} // Pass the amount to the Modal component
        setAmount={setAmount} // Pass the setAmount function to the Modal component
      />
      <ToastContainer />
    </div>
  );
};

'use client';

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import * as Web3 from '@solana/web3.js';
import confetti from 'canvas-confetti';
import './PresaleModal.css'; // Import your CSS file

// Define Solana cluster API URL
const clusterApiUrl = 'https://solana-mainnet.g.alchemy.com/v2/1svjVfapWGfjeLw5LVsxsnZofMHsloq7';

// Define PresaleModal component as a functional component
const PresaleModal: React.FC = () => {
    // State variables
    const [showTaskPopup, setShowTaskPopup] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('BHVfXgnDowLsHs5pCCqahz2vKiEDiSC1ViiUXuM5oofK');
    const [balance, setBalance] = useState<number>(0);
    const [isExecutable, setIsExecutable] = useState<boolean>(false);
    const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Function to fetch balance and account info
    const fetchAccountInfo = async (address: string) => {
        try {
            const key = new Web3.PublicKey(address);
            const connection = new Web3.Connection(clusterApiUrl);

            const balanceInLamports = await connection.getBalance(key);
            setBalance(balanceInLamports / Web3.LAMPORTS_PER_SOL);

            const accountInfo = await connection.getAccountInfo(key);
            setIsExecutable(accountInfo?.executable ?? false);
        } catch (error) {
            console.error("Failed to fetch account info:", error);
            alert("Failed to fetch account info. Please check the console for more details.");
        }
    };

    // UseEffect to fetch initial account info when modal opens
    useEffect(() => {
        if (showTaskPopup && address) {
            fetchAccountInfo(address);
            startConfetti();
        }
    }, [showTaskPopup, address]);

    // UseEffect to periodically update balance
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (showTaskPopup && address) {
            intervalId = setInterval(() => {
                fetchAccountInfo(address);
            }, 30000); // Update every 30 seconds (adjust as needed)
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }; // Cleanup interval on unmount or state change
    }, [showTaskPopup, address]);

    // Function to handle click on Earn Points button
    const handleEarnPointsClick = () => {
        setShowTaskPopup(true);
        // Disable scrolling on the body when modal is open
        document.body.style.overflow = 'hidden';
    };

    // Function to handle click on Close button
    const handleCloseClick = () => {
        setShowTaskPopup(false);
        stopConfetti();
        // Enable scrolling on the body when modal is closed
        document.body.style.overflow = 'auto';
    };

    // Function to copy address to clipboard
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address);
    };

    // Calculate progress bar width based on balance reaching 1500 SOL
    const bal = balance + 200;
    const progressBarWidth = (bal / 15000) * 100;

    // Function to start continuous confetti effect
    const startConfetti = () => {
        confettiIntervalRef.current = setInterval(() => {
            confetti({
                particleCount: 100, // Number of confetti particles per interval
                spread: 160, // Spread of the particles
                origin: { y: 0 } // Start from the top of the screen
            });
        }, 250); // Interval to continuously trigger confetti (adjust as needed)
    };

    // Function to stop confetti
    const stopConfetti = () => {
        if (confettiIntervalRef.current) {
            clearInterval(confettiIntervalRef.current);
            confettiIntervalRef.current = null;
        }
        confetti.reset();
    };

    return (
        <>
            <Button
                onClick={handleEarnPointsClick}
                className="animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-white font-bold py-2 px-2 rounded"
            >
                PRESALE🔥
            </Button>
            {showTaskPopup && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4 md:p-8">
                        <div className="bg-black rounded-lg p-4 md:p-8 border border-white border-solid shadow-lg max-w-full md:max-w-2xl w-full mx-4 overflow-y-auto">
                            <h2 className="text-center text-2xl font-bold text-red-500 mb-4">Presale Open Soon</h2>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                                    <video
                                        controls
                                        className="w-full rounded mt-1"
                                        style={{ maxWidth: "100%", height: "auto" }}
                                        autoPlay
                                    >
                                        <source src="/playape.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-2 md:px-4">
                                    <div className="flex flex-col items-center mb-4">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(address)}&size=250x250`}
                                            alt="QR Code"
                                            className="mb-2"
                                            style={{ width: "150px", height: "150px" }}
                                        />
                                        <button
                                            onClick={handleCopyAddress}
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Copy Address
                                        </button>
                                        <h1 className="slide-right-to-left">Private seed playape just secured 200 sol🔥 </h1> {/* Apply animation class */}
                                    </div>
                                    <div className="w-full flex items-center mb-2">
                                        <span className="text-xs text-blue-500">{bal} SOL</span>
                                        <div className="bg-gray-300 h-4 rounded-lg overflow-hidden flex-grow mx-2 relative">
                                            <div
                                                className="bg-red-500 h-full"
                                                style={{ width: `${progressBarWidth}%`, transition: "width 0.3s ease-in-out" }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-blue-500">15000 SOL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleCloseClick}
                        className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded fixed bottom-4 left-1/2 transform -translate-x-1/2"
                        style={{ maxWidth: "250px", zIndex: 100 }}
                    >
                        Close
                    </button>
                </>
            )}
        </>
    );
};

export default PresaleModal;

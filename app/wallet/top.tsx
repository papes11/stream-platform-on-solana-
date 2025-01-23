import React, { FormEvent, useState, useEffect } from "react";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from 'canvas-confetti';
import './styles.css';
import { Button } from "@/components/ui/button";

interface TaskPopupButtonProps {
    onTaskComplete: (points: number) => void;
}

const TaskPopupButton: React.FC<TaskPopupButtonProps> = ({ onTaskComplete }) => {
    const [showTaskPopup, setShowTaskPopup] = useState<boolean>(false);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [userPoints, setUserPoints] = useState<number>(0);
    const wallet: WalletContextState = useWallet();

    useEffect(() => {
        if (showTaskPopup) {
            startConfetti();
        } else {
            stopConfetti();
        }
    }, [showTaskPopup]);

    const handleTaskCompletion = (taskId: number, points: number) => {
        if (!completedTasks.includes(taskId)) {
            onTaskComplete(points);
            setCompletedTasks(prev => [...prev, taskId]);
            setUserPoints(prevPoints => prevPoints + points);
            if (completedTasks.length + 1 === 3) {
                setUserPoints(prevPoints => prevPoints + 3000);
                toast.success("All tasks completed! Extra points awarded.");
            }
        }
    };

    const handleVisitLink = () => {
        window.open("https://x.com/PLAYapecoin", "_blank", "noopener,noreferrer");
        handleTaskCompletion(1, 1000);
    };

    const handleRetweet = () => {
        window.open("https://x.com/PLAYapecoin/status/1793523500143309213", "_blank", "noopener,noreferrer");
        handleTaskCompletion(2, 1000);
    };

    const handleLike = () => {
        window.open("https://x.com/PLAYapecoin/status/1791018972856643838", "_blank", "noopener,noreferrer");
        handleTaskCompletion(3, 1000);
    };

    const handleEarnPointsClick = () => {
        setShowTaskPopup(true);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!wallet.connected) {
            toast.error("Please connect your wallet to verify address.");
            return;
        }

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        const walletAddress = formData.get('walletAddress');
        const userPoints = formData.get('userPoints');
        const task = formData.get('task');

        if (!name || !walletAddress || !userPoints || !task) {
            toast.error("Please fill in all the fields.");
            return;
        }

        // Save data to local storage
        const userData = {
            name: name,
            walletAddress: walletAddress,
            userPoints: userPoints,
            task: task
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        toast.success("Verification submitted ✨ 🥳!");
        (event.currentTarget as HTMLFormElement).reset();
    };

    const startConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 160,
            origin: { y: 0.7 }
        });
    };

    const stopConfetti = () => {
        confetti.reset();
    };

    return (
        <>
            <Button
                onClick={handleEarnPointsClick}
                className="bg-blue-500 hover:bg-blue-700 animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-white font-bold py-5 px-2 rounded ml-1 mt-4"
            >
                Get Airdrop💰
            </Button>
            {showTaskPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-1 border bg-current border-gray-300 shadow-lg blinking-container w-full max-w-4xl mx-auto overflow-y-auto max-h-full">
                        <div className="bg-black rounded-lg p-8 flex flex-col md:flex-row">
                            <video
                                controls
                                className="w-full md:w-1/2 rounded mt-1 md:mr-8 mb-4 md:mb-0"
                                style={{ maxWidth: "100%", height: "auto" }}
                                autoPlay
                            >
                                <source src="/playape.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="flex flex-col w-full md:w-1/2">
                                <h2 className="text-white font-bold text-center mb-4 blinking-text">
                                    Complete Tasks 𝕏
                                </h2>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={handleVisitLink}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                                        >
                                            Follow 𝕏
                                        </button>
                                        <span className="text-green-500 font-bold">
                                            1000 $PLAYape
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={handleRetweet}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Retweet 𝕏
                                        </button>
                                        <span className="text-green-500 font-bold">
                                            1000 $PLAYape
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={handleLike}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
                                        >
                                            Like 𝕏
                                        </button>
                                        <span className="text-green-500 font-bold">
                                            1000 $PLAYape
                                        </span>
                                    </div>
                                    <div className="text-white font-bold mt-4 text-center">
                                        <p>Your $PLAYape: {userPoints}</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <input
                                        type="text"
                                        placeholder="@Twitter id"
                                        name="name"
                                        id="name"
                                        required
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
                                    />
                                    <input
                                        type="hidden"
                                        name="walletAddress"
                                        value={wallet.publicKey ? wallet.publicKey.toBase58() : ""}
                                    />
                                    <input type="hidden" name="userPoints" value={userPoints} />
                                    <input type="hidden" name="task" value="Complete Task X" />
                                    <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-4">
                                        Verify
                                    </button>
                                </form>
                                <button
                                    onClick={() => setShowTaskPopup(false)}
                                    className="block mx-auto bg-gray-500 hover:bg-red-600 animate-pulse bg-gradient-to-br from-grey-500 to-grey-500 hover:from-white hover:to-purple-300 text-black font-bold py-2 px-8 rounded mt-4"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Canvas for confetti */}
            <canvas id="confetti-canvas" style={{ position: "fixed", pointerEvents: "none", zIndex: 100 }} />
        </>
    );
};

export default TaskPopupButton;

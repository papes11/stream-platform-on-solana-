import React, { FC } from 'react';
import './modal.css'; // Import the modal CSS file

interface ModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    amount: string; // Change type to string
    setAmount: (amount: string) => void; // Change type to string
}

const Modal: FC<ModalProps> = ({ show, onConfirm, onCancel, amount, setAmount }) => {
    if (!show) return null; // If show is false, don't render the modal

    return (
        <div id="container" className="modal">
            <div className="container-inner">
                <div className="content">
                    <p>Welcome TO PLAYape</p>
                    <div className="input-container">
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            placeholder="amount apefam" 
                            className="amount-input" 
                        />
                        <span className="sol">$PLAYape</span>
                    </div>
                </div>
                <div className="buttons">
                    <button type="button" className="confirm" onClick={onConfirm}>Confirm</button>
                    <button type="button" className="cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

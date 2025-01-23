Description: Streaming Platform on Solana
This platform is designed as a decentralized streaming platform built on the Solana blockchain, leveraging its high speed, low transaction fees, and scalability. It offers users a seamless experience for streaming, wallet integration, and microtransactions using tokens. Below are the key features and their functionalities:

1. Wallet Connection
Feature: Users connect their Solana wallet (e.g., Phantom, Solflare, or other supported wallets) to access the platform.
Purpose:
Ensures a secure and decentralized login process.
Eliminates the need for traditional email/password combinations, increasing security.
Functionality:
The platform uses Solana Wallet Adapter to detect and connect to wallets.
Once connected, users’ wallet addresses are displayed in the UI, replacing a username.
Allows for interaction with the blockchain (e.g., tipping, sending tokens).
2. Login with Wallet
Feature: Login is tied to wallet authentication.
Purpose:
Secure login that verifies user ownership of the wallet.
Functionality:
When users log in, a message (nonce) is signed by their wallet to verify their identity.
The signed message is sent to the backend for verification.
Users are logged in without requiring private keys, ensuring security.
3. Streaming Integration
Feature: The platform allows creators to host live streams or upload pre-recorded content.
Purpose:
Provide a decentralized environment for sharing video content.
Functionality:
Creators upload videos that are stored on decentralized storage (e.g., Arweave or IPFS).
Live streams are integrated with real-time chat powered by blockchain transactions for tipping.
Token-based interaction is embedded, allowing viewers to tip during the stream.
4. Tipping Tokens
Feature: Viewers can tip creators using Solana-based tokens (e.g., SOL, SPL tokens).
Purpose:
Allow direct monetization for creators.
Microtransactions ensure low-cost interactions for viewers.
Functionality:
Users select the tip amount and confirm the transaction via their connected wallet.
Tipping is processed as an on-chain transaction, updating the creator’s wallet balance in real-time.
Transactions are logged on the blockchain, ensuring transparency.
5. Creator Dashboard
Feature: A dedicated dashboard for content creators to manage their streams and earnings.
Purpose:
Centralize analytics, video management, and token balance details in one place.
Functionality:
Displays real-time token balances.
Tracks viewer interactions, tips, and other transactions.
Allows content uploads and stream scheduling.
6. Real-Time Transactions
Feature: On-chain transactions for tipping or other token interactions.
Purpose:
Provide immutable, transparent records of all microtransactions on the platform.
Functionality:
When viewers tip, the transaction details (amount, sender, receiver) are recorded on the Solana blockchain.
Real-time updates ensure the creator sees their token balance grow instantly.
7. Token Support
Feature: The platform supports multiple Solana-based tokens.
Purpose:
Flexibility for viewers to tip using SOL or custom SPL tokens.
Functionality:
Supports native SOL for tipping.
Additional SPL tokens (e.g., USDC, custom tokens) can be integrated for specific campaigns or loyalty rewards.
Viewers can convert one token into another via integrated swaps.
8. Decentralized Storage for Media
Feature: Content is stored on decentralized storage networks.
Purpose:
Ensures content is censorship-resistant and not reliant on centralized servers.
Functionality:
Videos and metadata are uploaded to platforms like Arweave or IPFS, enabling fast retrieval and distribution.
9. User Chat with Token Incentives
Feature: Real-time chat allows viewers to interact with creators and other viewers.
Purpose:
Enhance user engagement during live streams.
Functionality:
Messages can be highlighted through token-based incentives (e.g., a viewer pays 1 SOL to pin their message).
Chat messages are signed using wallets for identity verification.
10. Gamification and Loyalty
Feature: Introduces gamified rewards for consistent viewers and tippers.
Purpose:
Encourage engagement and reward loyal users.
Functionality:
Viewers earn loyalty points or tokens based on their activity (e.g., watching, tipping, chatting).
Loyalty points can be exchanged for platform perks (e.g., exclusive content, badges).
11. Security
Feature: Built on Solana for high security and transaction integrity.
Purpose:
Ensure secure transactions and user data through cryptographic verification.
Functionality:
Wallet-based authentication eliminates the need for sensitive user data storage.
Transactions are processed via Solana’s highly secure blockchain infrastructure.
This platform provides a seamless, decentralized way for creators to monetize content while offering users an engaging experience with features like wallet integration, tipping, and secure transactions. Powered by Solana, it ensures low fees, high scalability, and unmatched speed.

NOTE create .env to main and add
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=

sql database
DATABASE_URL=""sql 

for postgresqlc change prisma model

//Go to livekit
LIVEKIT_API_URL=""

LIVEKIT_API_KEY=""

LIVEKIT_API_SECRET=""

NEXT_PUBLIC_LIVEKIT_WS_URL=""


// Go to Uploading thing and get credentials
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

use mongodb
uri ="use mongodb"

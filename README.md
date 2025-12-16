# 😊 Smile2Earn

**Your smile is worth something.**

Smile2Earn is a Farcaster Mini App that detects a user’s smile using on-device AI and rewards them with USDC on the Base blockchain. It combines computer vision, wallet-native UX, and x402-powered micro-payments to create a fun and meaningful onchain interaction.

---

## 🚀 What is Smile2Earn?

Smile2Earn turns a simple human emotion — a smile — into an onchain reward.

The app:
- Detects a real smile using the device camera
- Connects seamlessly to a Base wallet inside Farcaster
- Allows the user to claim a small USDC reward
- Uses x402 middleware to handle payments securely and programmatically

No private keys are stored, and no biometric data leaves the device.

---

## 🧠 How it works (High-level Flow)

1. User opens the Farcaster Mini App  
2. Wallet connects automatically (Base network)  
3. Camera opens and detects a smile (AI runs fully on-device)  
4. Once a smile is detected, the camera stops  
5. User clicks **Claim Reward**  
6. Backend validates the request and prevents duplicates  
7. x402 executes a USDC transfer on Base  
8. User sees the reward in their wallet and on BaseScan  

---

## 🏗 Architecture

**Frontend**
- React + Vite
- face-api.js for smile detection
- Farcaster Mini App SDK
- wagmi for wallet connection (Base)

**Backend**
- Node.js + Express
- x402-express middleware
- Simple in-memory anti-duplicate protection

**Blockchain**
- Base / Base Sepolia
- USDC (ERC-20)
- x402 facilitator for transaction execution

---

## 🔐 Privacy & Security

- Camera access is used only for real-time detection
- No images or video frames are stored or sent to any server
- Smile detection runs entirely on the client
- No private keys are stored in frontend or backend
- Payments are delegated via x402 (no raw transaction signing in app code)

---

## 🧪 Current Status

- ✅ Smile detection working
- ✅ Wallet connection working (Base)
- ✅ Backend claim logic working
- ✅ Anti-duplicate reward protection
- 🟡 USDC transfer currently tested in simulated / dev mode
- 🔜 Ready for full x402 production payout setup

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, face-api.js
- **Wallet:** Farcaster Mini App + wagmi
- **Backend:** Node.js, Express
- **Payments:** x402
- **Blockchain:** Base / Base Sepolia
- **Token:** USDC

---

## 🌍 Why this matters

Smile2Earn demonstrates how:
- Human actions can become onchain triggers
- AI can run locally without sacrificing privacy
- Payments can be automated using web-native protocols like x402
- Farcaster Mini Apps can enable delightful, low-friction Web3 UX

This pattern can extend to:
- Wellness rewards
- Proof-of-attention
- Human-in-the-loop systems
- Onchain engagement incentives

---

## 🔮 Future Improvements

- Real-time transaction status & BaseScan links
- Per-day reward limits
- Farcaster FID-based identity checks
- Smart contract escrow for rewards
- Expanded emotion detection

---

## 👤 Builder

**Sayan Genri**

- Farcaster / Web3 Developer
- Focused on human-centric onchain experiences

---

## 📜 License

MIT


## 📂 Project Structure


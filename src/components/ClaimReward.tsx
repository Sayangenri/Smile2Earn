import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { rewardUser } from "./Reward";

interface Props {
  onReset: () => void;
}

const ClaimReward = ({ onReset }: Props) => {
  const { address } = useWallet();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClaim = async () => {
    if (!address) return;

    setIsClaiming(true);
    setError(null);

    try {
      await rewardUser(address);
      setClaimed(true);
    } catch (err) {
      setError("Failed to claim reward. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  };

  if (claimed) {
    return (
      <div className="claim-box">
        <h3>🎉 Reward Claimed!</h3>
        <p style={{ color: '#22c55e', marginBottom: '20px' }}>
          USDC has been sent to your wallet
        </p>
        <button type="button" onClick={onReset}>Smile Again</button>
      </div>
    );
  }

  return (
    <div className="claim-box">
      <h3>Claim Your Reward</h3>
      <p style={{ marginBottom: '20px', color: '#94a3b8' }}>
        You've earned 0.01 USDC for smiling! 🎊
      </p>

      {error && (
        <div className="status-message error" style={{ marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleClaim}
        disabled={isClaiming}
        style={{
          background: isClaiming
            ? "linear-gradient(45deg, #64748b, #94a3b8)"
            : "linear-gradient(45deg, #fbbf24, #f59e0b)",
          marginBottom: "12px",
        }}
      >
        {isClaiming ? (
          <>
            <span className="loading" style={{ marginRight: "8px" }} />
            Claiming...
          </>
        ) : (
          '💰 Claim 0.01 USDC'
        )}
      </button>

      <button
        type="button"
        onClick={onReset}
        style={{
          background: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#94a3b8",
        }}
      >
        Back to Camera
      </button>
    </div>
  );
};

export default ClaimReward;

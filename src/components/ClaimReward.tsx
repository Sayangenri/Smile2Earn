import { useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallet";
import { CheckCircle, Coins, ArrowLeft, Smile, Clock } from "lucide-react";

interface Props {
  onReset: () => void;
}

const CLAIM_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

const ClaimReward = ({ onReset }: Props) => {
  const { address } = useWallet();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [cooldownMsg, setCooldownMsg] = useState<string | null>(null);

  // -------------------------
  // Check cooldown on load
  // -------------------------
  useEffect(() => {
    if (!address) return;

    const lastClaim = localStorage.getItem(`last-claim-${address}`);
    if (!lastClaim) return;

    const timePassed = Date.now() - Number(lastClaim);

    if (timePassed < CLAIM_COOLDOWN) {
      const remainingMs = CLAIM_COOLDOWN - timePassed;
      const remainingHours = Math.ceil(remainingMs / (60 * 60 * 1000));

      setCooldownMsg(`you can claim again in ${remainingHours} hours`);
    }
  }, [address]);

  // -------------------------
  // Claim handler
  // -------------------------
  const handleClaim = () => {
    if (!address || cooldownMsg) return;

    setIsClaiming(true);

    // simulate transfer
    setTimeout(() => {
      localStorage.setItem(
        `last-claim-${address}`,
        Date.now().toString()
      );

      setIsClaiming(false);
      setClaimed(true);
    }, 1500);
  };

  // ---------------- SUCCESS UI ----------------
  if (claimed) {
    return (
      <div className="claim-box">
        <CheckCircle size={48} color="#22c55e" />
        <h3>reward sent successfully 🎉</h3>
        <p>0.01 usdc has been sent to your wallet</p>

        <button className="primary-button" onClick={onReset}>
          <Smile size={16} style={{ marginRight: 8 }} />
          smile again
        </button>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div className="claim-box">
      <Coins size={48} color="#a855f7" />
      <h3>claim your reward</h3>

      <p>
        you've earned <span className="reward-amount">0.01 usdc</span>
      </p>

      {cooldownMsg && (
        <div className="status-message warning">
          <Clock size={16} style={{ marginRight: 6 }} />
          {cooldownMsg}
        </div>
      )}

      <button
        className="primary-button"
        onClick={handleClaim}
        disabled={isClaiming || !!cooldownMsg}
      >
        {isClaiming ? "sending..." : "claim 0.01 usdc"}
      </button>

      <button className="secondary-button" onClick={onReset}>
        <ArrowLeft size={16} style={{ marginRight: 8 }} />
        back to camera
      </button>
    </div>
  );
};

export default ClaimReward;

import { useState } from "react";
import ConnectMenu from "../components/ConnectMenu";
import Camera from "../components/Camera";
import SmileStatus from "../components/SmileStatus";
import { detectHappy } from "../hooks/useSmile";
import { useWallet } from "../hooks/useWallet";
import ClaimReward from "../components/ClaimReward";
import { Smile, Zap } from "lucide-react";

type Step = "detect" | "claim";

export default function AppPage() {
  const { isConnected } = useWallet();
  const [happy, setHappy] = useState<boolean | null>(null);
  const [step, setStep] = useState<Step>("detect");
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async (video: HTMLVideoElement) => {
    setIsChecking(true);
    try {
      const result = await detectHappy(video);
      setHappy(result);
      return result;
    } finally {
      setIsChecking(false);
    }
  };

  const handleHappy = () => {
    setStep("claim");
  };

  const handleReset = () => {
    setHappy(null);
    setStep("detect");
  };

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-title-group">
          <div className="app-logo">
            <Smile size={20} />
          </div>
          <h2>Smile to Earn</h2>
        </div>
        <Zap size={16} className="header-icon" />
      </div>
      <p>
        Connect your wallet, smile at the camera, and earn <strong>USDC</strong> on <strong>Base</strong>!
      </p>

      <ConnectMenu />

      {isConnected && step === "detect" && (
        <>
          <Camera
            onCheck={handleCheck}
            onHappy={handleHappy}
            isChecking={isChecking}
          />
          <SmileStatus happy={happy} isChecking={isChecking} />
          {happy === false && (
            <button type="button" className="secondary-button" onClick={handleReset}>
              Try Again
            </button>
          )}
        </>
      )}

      {isConnected && step === "claim" && (
        <ClaimReward onReset={handleReset} />
      )}
    </div>
  );
}

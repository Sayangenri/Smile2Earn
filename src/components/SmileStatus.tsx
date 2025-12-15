import { Camera, Smile, Frown } from "lucide-react";

interface Props {
  happy: boolean | null;
  isChecking: boolean;
}

export default function SmileStatus({ happy, isChecking }: Props) {
  if (isChecking) {
    return (
      <div className="status-message neutral">
        <span className="loading" />
        Analyzing your smile...
      </div>
    );
  }

  if (happy === null) {
    return (
      <div className="status-message neutral">
        <Camera size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        Position your face in the camera and click "Check My Smile"
      </div>
    );
  }

  return happy ? (
    <div className="status-message success">
      <Smile size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
      Great smile detected! You can now claim your reward.
    </div>
  ) : (
    <div className="status-message error">
      <Frown size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
      Smile not detected. Try smiling more broadly!
    </div>
  );
}

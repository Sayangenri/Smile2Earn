interface Props {
  happy: boolean | null;
  isChecking: boolean;
}

export default function SmileStatus({ happy, isChecking }: Props) {
  if (isChecking) {
    return (
      <div className="status-message neutral">
        <span className="loading" style={{ marginRight: "8px" }} />
        Analyzing your smile...
      </div>
    );
  }

  if (happy === null) {
    return (
      <div className="status-message neutral">
        📹 Position your face in the camera and click "Check My Smile"
      </div>
    );
  }

  return happy ? (
    <div className="status-message success">
      😄 Great smile detected! You can now claim your reward.
    </div>
  ) : (
    <div className="status-message error">
      😐 Smile not detected. Try smiling more broadly!
    </div>
  );
}

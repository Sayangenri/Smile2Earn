import { useEffect, useRef } from "react";
import { loadModels } from "../hooks/useSmile";
import { Smile } from "lucide-react";

interface Props {
  onCheck: (video: HTMLVideoElement) => Promise<boolean | null>;
  onHappy: () => void;
  isChecking: boolean;
}

export default function Camera({ onCheck, onHappy, isChecking }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    loadModels();

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });

    return () => stopCamera();
  }, []);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  };

  const handleCheck = async () => {
    if (!videoRef.current) return;

    const happy = await onCheck(videoRef.current);

    if (happy) {
      stopCamera();
      onHappy();
    }
  };

  return (
    <div className="camera-box">
      <video ref={videoRef} autoPlay muted playsInline />
      <button type="button" className="primary-button" onClick={handleCheck} disabled={isChecking}>
        {isChecking ? (
          <>
            <span className="loading" />
            Analyzing...
          </>
        ) : (
          <>
            <Smile size={16} style={{ marginRight: '8px' }} />
            Check My Smile
          </>
        )}
      </button>
    </div>
  );
}

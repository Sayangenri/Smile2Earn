import { useWallet } from "../hooks/useWallet";
import { Wallet, Link } from "lucide-react";

export default function ConnectMenu() {
  const { isConnected, address, connect, connectors, isConnecting } =
    useWallet();

  if (isConnected) {
    return (
      <div className="wallet-box">
        <p>Wallet Connected</p>
        <p>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="primary-button"
      disabled={isConnecting}
      onClick={() => connect({ connector: connectors[0] })}
    >
      {isConnecting ? (
        <>
          <span className="loading" />
          Connecting...
        </>
      ) : (
        <>
          <Link size={16} style={{ marginRight: '8px' }} />
          Connect Base Wallet
        </>
      )}
    </button>
  );
}

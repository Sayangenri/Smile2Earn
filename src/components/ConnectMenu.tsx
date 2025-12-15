import { useWallet } from "../hooks/useWallet";

export default function ConnectMenu() {
  const { isConnected, address, connect, connectors, isConnecting } =
    useWallet();

  if (isConnected) {
    return (
      <div className="wallet-box">
        <p>Wallet Connected</p>
        <p style={{ fontSize: '12px', color: '#60a5fa' }}>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={isConnecting}
      onClick={() => connect({ connector: connectors[0] })}
      style={{
        background: isConnecting
          ? "linear-gradient(45deg, #64748b, #94a3b8)"
          : "linear-gradient(45deg, #2563eb, #3b82f6)",
      }}
    >
      {isConnecting ? (
        <>
          <span className="loading" style={{ marginRight: "8px" }} />
          Connecting...
        </>
      ) : (
        '🔗 Connect Base Wallet'
      )}
    </button>
  );
}

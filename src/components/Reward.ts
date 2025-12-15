export async function rewardUser(walletAddress: string) {
  const res = await fetch("https://YOUR_BACKEND_URL/reward", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      walletAddress,
    }),
  });

  if (!res.ok) {
    throw new Error("reward failed");
  }

  return res.json();
}
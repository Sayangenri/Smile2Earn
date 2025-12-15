import { useEffect } from "react";
import AppPage from "./pages/App";
import { initFarcasterMiniApp } from "./config/farcaster";

function App() {
  useEffect(() => {
    // Initialize Farcaster mini app (safe in browser + viewer)
    initFarcasterMiniApp();
  }, []);

  return <AppPage />;
}

export default App;

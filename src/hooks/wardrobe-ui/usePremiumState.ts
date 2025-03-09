
import { useState } from "react";

export function usePremiumState() {
  const [isPremium, setIsPremium] = useState(false);
  
  const togglePremium = () => {
    setIsPremium(!isPremium);
  };

  return {
    isPremium,
    setIsPremium,
    togglePremium
  };
}


import { useState, useEffect } from "react";

export function useTabState() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeWardrobeTab") || "clothing";
  });
  
  useEffect(() => {
    localStorage.setItem("activeWardrobeTab", activeTab);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab
  };
}

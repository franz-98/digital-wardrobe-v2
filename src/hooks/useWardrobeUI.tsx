
import { useState, useEffect } from "react";

export function useWardrobeUI() {
  const [isPremium, setIsPremium] = useState(false);
  const [isCreatingOutfit, setIsCreatingOutfit] = useState(false);
  const [newOutfitName, setNewOutfitName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeWardrobeTab") || "clothing";
  });
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [timeRange, setTimeRange] = useState("month");
  
  useEffect(() => {
    localStorage.setItem("activeWardrobeTab", activeTab);
  }, [activeTab]);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      setTimeout(() => {
        const searchInput = document.getElementById('search');
        if (searchInput) searchInput.focus();
      }, 100);
    } else {
      setSearchTerm("");
    }
  };

  const togglePremium = () => {
    setIsPremium(!isPremium);
  };

  return {
    isPremium,
    setIsPremium,
    isCreatingOutfit,
    setIsCreatingOutfit,
    newOutfitName,
    setNewOutfitName,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    showSearchBar,
    timeRange,
    setTimeRange,
    toggleSearchBar,
    togglePremium
  };
}

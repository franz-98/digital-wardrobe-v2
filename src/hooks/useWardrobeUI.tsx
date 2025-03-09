
import { 
  usePremiumState,
  useOutfitCreation,
  useSearchState,
  useTabState,
  useTimeRange
} from "./wardrobe-ui";

export function useWardrobeUI() {
  const { isPremium, setIsPremium, togglePremium } = usePremiumState();
  const { isCreatingOutfit, setIsCreatingOutfit, newOutfitName, setNewOutfitName } = useOutfitCreation();
  const { searchTerm, setSearchTerm, showSearchBar, toggleSearchBar } = useSearchState();
  const { activeTab, setActiveTab } = useTabState();
  const { timeRange, setTimeRange } = useTimeRange();

  return {
    // Premium state
    isPremium,
    setIsPremium,
    
    // Outfit creation state
    isCreatingOutfit,
    setIsCreatingOutfit,
    newOutfitName,
    setNewOutfitName,
    
    // Search state
    searchTerm,
    setSearchTerm,
    showSearchBar,
    
    // Tab state
    activeTab,
    setActiveTab,
    
    // Time range state
    timeRange,
    setTimeRange,
    
    // Actions
    toggleSearchBar,
    togglePremium
  };
}

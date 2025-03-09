
// This file is kept for backward compatibility but is no longer used directly.
// The functionality is now in WardrobeContext.tsx to avoid circular dependencies.

import { useWardrobe } from "@/context/WardrobeContext";

// Re-export the hook for backwards compatibility
export const useWardrobeState = useWardrobe;

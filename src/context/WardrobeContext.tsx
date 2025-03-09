
import React, { createContext, useContext } from 'react';
import { WardrobeContextType, initialWardrobeContext } from './WardrobeContextTypes';

// Create the context with the initial state
export const WardrobeContext = createContext<WardrobeContextType>(initialWardrobeContext);

// Create a custom hook to use the context
export const useWardrobe = () => {
  return useContext(WardrobeContext);
};

// Re-export the provider
export { WardrobeProvider } from './WardrobeProvider';

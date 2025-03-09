
// This file re-exports all the wardrobe hooks to avoid circular dependencies
import { useWardrobeData } from "./useWardrobeData";
import { useWardrobeUI } from "./useWardrobeUI";
import { useItemSelection } from "./useItemSelection";
import { useWardrobeActions } from "./useWardrobeActions";
import { useNavigationEffects } from "./useNavigationEffects";

export {
  useWardrobeData,
  useWardrobeUI,
  useItemSelection,
  useWardrobeActions,
  useNavigationEffects
};


import { WardrobeActionsProps } from "./wardrobe-actions/types";
import { useOutfitActions } from "./wardrobe-actions/useOutfitActions";
import { useItemActions } from "./wardrobe-actions/useItemActions";
import { useStatsActions } from "./wardrobe-actions/useStatsActions";
import { usePremiumActions } from "./wardrobe-actions/usePremiumActions";

export function useWardrobeActions(props: WardrobeActionsProps) {
  const outfitActions = useOutfitActions(props);
  const itemActions = useItemActions(props);
  const statsActions = useStatsActions();
  const premiumActions = usePremiumActions(props);

  return {
    ...outfitActions,
    ...itemActions,
    ...statsActions,
    ...premiumActions
  };
}

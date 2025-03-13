
/**
 * Maps English category names to their Italian translations (in singular form)
 */
export const englishToItalianCategories: Record<string, string> = {
  "Tops": "Maglia",
  "Bottoms": "Pantalone",
  "Dresses": "Vestito",
  "Outerwear": "Capospalla",
  "Footwear": "Calzatura",
  "Accessories": "Accessorio",
  "Underwear": "Intimo",
  "Swimwear": "Costume da bagno",
  "Sportswear": "Abbigliamento sportivo",
  "Sleepwear": "Pigiama",
  "Formal": "Formale",
  "Casual": "Casual",
  "Business": "Business",
  "Shoes": "Scarpa",
  "Uncategorized": "Non categorizzato"
};

/**
 * Translates an English category name to Italian
 * @param englishCategory The English category name
 * @returns The Italian translation or the original name if no translation exists
 */
export const translateCategoryToItalian = (englishCategory: string): string => {
  return englishToItalianCategories[englishCategory] || englishCategory;
};

/**
 * Translates an Italian category name back to English
 * @param italianCategory The Italian category name
 * @returns The English original or the input if no match is found
 */
export const translateCategoryToEnglish = (italianCategory: string): string => {
  const entries = Object.entries(englishToItalianCategories);
  const match = entries.find(([_, italian]) => italian === italianCategory);
  return match ? match[0] : italianCategory;
};

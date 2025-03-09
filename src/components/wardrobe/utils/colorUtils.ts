
/**
 * Maps common color names to their hex values
 * Extends with additional colors as needed
 */
export const colorNameToHex = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    // Basic colors
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'green': '#008000',
    'blue': '#0000FF',
    'yellow': '#FFFF00',
    'purple': '#800080',
    'orange': '#FFA500',
    'pink': '#FFC0CB',
    'brown': '#A52A2A',
    'gray': '#808080',
    'grey': '#808080',
    
    // Extended colors
    'navy': '#000080',
    'teal': '#008080',
    'maroon': '#800000',
    'olive': '#808000',
    'beige': '#F5F5DC',
    'cyan': '#00FFFF',
    'magenta': '#FF00FF',
    'silver': '#C0C0C0',
    'gold': '#FFD700',
    'indigo': '#4B0082',
    'violet': '#EE82EE',
    'khaki': '#F0E68C',
    'salmon': '#FA8072',
    'crimson': '#DC143C',
    'lavender': '#E6E6FA',
    'plum': '#DDA0DD',
    'turquoise': '#40E0D0',
    'tan': '#D2B48C',
    'skyblue': '#87CEEB',
    'coral': '#FF7F50',
  };
  
  const lowerCaseColor = colorName.toLowerCase();
  return colorMap[lowerCaseColor] || '#777777'; // Default gray for unknown colors
};

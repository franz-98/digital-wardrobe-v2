
/**
 * Maps common color names to descriptive Italian fashion color terms
 */
export const translateColorToItalianFashion = (color: string): string => {
  const colorMap: Record<string, string> = {
    // Basic colors
    'black': 'nero',
    'white': 'bianco',
    'red': 'rosso',
    'green': 'verde',
    'blue': 'blu',
    'yellow': 'giallo',
    'purple': 'viola',
    'orange': 'arancione',
    'pink': 'rosa',
    'brown': 'marrone',
    'gray': 'grigio',
    'grey': 'grigio',
    
    // Fashion-specific colors
    'navy': 'blu navy',
    'teal': 'verde acqua',
    'maroon': 'bordeaux',
    'olive': 'verde oliva',
    'beige': 'beige',
    'cream': 'crema',
    'ivory': 'avorio',
    'cyan': 'azzurro',
    'magenta': 'magenta',
    'silver': 'argento',
    'gold': 'oro',
    'indigo': 'indaco',
    'violet': 'violetto',
    'khaki': 'kaki',
    'salmon': 'salmone',
    'crimson': 'cremisi',
    'lavender': 'lavanda',
    'plum': 'prugna',
    'turquoise': 'turchese',
    'tan': 'cuoio',
    'skyblue': 'celeste',
    'coral': 'corallo',
    'charcoal': 'antracite',
    'midnight blue': 'blu notte',
    'forest green': 'verde foresta',
    'hot pink': 'rosa acceso',
    'light blue': 'azzurro chiaro',
    'dark blue': 'blu scuro',
    'light green': 'verde chiaro',
    'dark green': 'verde scuro',
    'light gray': 'grigio chiaro',
    'dark gray': 'grigio scuro',
  };
  
  // Case-insensitive lookup
  const lowerCaseColor = color.toLowerCase();
  return colorMap[lowerCaseColor] || color;
};

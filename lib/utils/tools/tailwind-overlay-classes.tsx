interface WordPressToTailwindMap {
  [key: string]: string;
}

const wordpressToTailwindColors: WordPressToTailwindMap = {
  'base/10': 'bg-base1/10',
  'base/20': 'bg-base1/20',
  'base/30': 'bg-base1/30',
  'base/40': 'bg-base1/40',
  'base/50': 'bg-base1/50',
  'base/60': 'bg-base1/60',
  'base/70': 'bg-base1/70',
  'base/80': 'bg-base1/80',
  'base/90': 'bg-base1/90',
  'base/100': 'bg-base1/100',
  'base-2/10': 'bg-base2/10',
  'base-2/20': 'bg-base2/20',
  'base-2/30': 'bg-base2/30',
  'base-2/40': 'bg-base2/40',
  'base-2/50': 'bg-base2/50',
  'base-2/60': 'bg-base2/60',
  'base-2/70': 'bg-base2/70',
  'base-2/80': 'bg-base2/80',
  'base-2/90': 'bg-base2/90',
  'base-2/100': 'bg-base2/100',
  'contrast/10': 'bg-contrast1/10',
  'contrast/20': 'bg-contrast1/20',
  'contrast/30': 'bg-contrast1/30',
  'contrast/40': 'bg-contrast1/40',
  'contrast/50': 'bg-contrast1/50',
  'contrast/60': 'bg-contrast1/60',
  'contrast/70': 'bg-contrast1/70',
  'contrast/80': 'bg-contrast1/80',
  'contrast/90': 'bg-contrast1/90',
  'contrast/100': 'bg-contrast1/100',
  'contrast-2/10': 'bg-contrast2/10',
  'contrast-2/20': 'bg-contrast2/20',
  'contrast-2/30': 'bg-contrast2/30',
  'contrast-2/40': 'bg-contrast2/40',
  'contrast-2/50': 'bg-contrast2/50',
  'contrast-2/60': 'bg-contrast2/60',
  'contrast-2/70': 'bg-contrast2/70',
  'contrast-2/80': 'bg-contrast2/80',
  'contrast-2/90': 'bg-contrast2/90',
  'contrast-2/100': 'bg-contrast2/100',
  'contrast-3/10': 'bg-contrast3/10',
  'contrast-3/20': 'bg-contrast3/20',
  'contrast-3/30': 'bg-contrast3/30',
  'contrast-3/40': 'bg-contrast3/40',
  'contrast-3/50': 'bg-contrast3/50',
  'contrast-3/60': 'bg-contrast3/60',
  'contrast-3/70': 'bg-contrast3/70',
  'contrast-3/80': 'bg-contrast3/80',
  'contrast-3/90': 'bg-contrast3/90',
  'contrast-3/100': 'bg-contrast3/100',
  'accent/10': 'bg-accent1/10',
  'accent/20': 'bg-accent1/20',
  'accent/30': 'bg-accent1/30',
  'accent/40': 'bg-accent1/40',
  'accent/50': 'bg-accent1/50',
  'accent/60': 'bg-accent1/60',
  'accent/70': 'bg-accent1/70',
  'accent/80': 'bg-accent1/80',
  'accent/90': 'bg-accent1/90',
  'accent/100': 'bg-accent1/100',
  'accent-2/10': 'bg-accent2/10',
  'accent-2/20': 'bg-accent2/20',
  'accent-2/30': 'bg-accent2/30',
  'accent-2/40': 'bg-accent2/40',
  'accent-2/50': 'bg-accent2/50',
  'accent-2/60': 'bg-accent2/60',
  'accent-2/70': 'bg-accent2/70',
  'accent-2/80': 'bg-accent2/80',
  'accent-2/90': 'bg-accent2/90',
  'accent-2/100': 'bg-accent2/100',
  'accent-3/10': 'bg-accent3/10',
  'accent-3/20': 'bg-accent3/20',
  'accent-3/30': 'bg-accent3/30',
  'accent-3/40': 'bg-accent3/40',
  'accent-3/50': 'bg-accent3/50',
  'accent-3/60': 'bg-accent3/60',
  'accent-3/70': 'bg-accent3/70',
  'accent-3/80': 'bg-accent3/80',
  'accent-3/90': 'bg-accent3/90',
  'accent-3/100': 'bg-accent3/100',
  'accent-4/10': 'bg-accent4/10',
  'accent-4/20': 'bg-accent4/20',
  'accent-4/30': 'bg-accent4/30',
  'accent-4/40': 'bg-accent4/40',
  'accent-4/50': 'bg-accent4/50',
  'accent-4/60': 'bg-accent4/60',
  'accent-4/70': 'bg-accent4/70',
  'accent-4/80': 'bg-accent4/80',
  'accent-4/90': 'bg-accent4/90',
  'accent-4/100': 'bg-accent4/100',
  'accent-5/10': 'bg-accent5/10',
  'accent-5/20': 'bg-accent5/20',
  'accent-5/30': 'bg-accent5/30',
  'accent-5/40': 'bg-accent5/40',
  'accent-5/50': 'bg-accent5/50',
  'accent-5/60': 'bg-accent5/60',
  'accent-5/70': 'bg-accent5/70',
  'accent-5/80': 'bg-accent5/80',
  'accent-5/90': 'bg-accent5/90',
  'accent-5/100': 'bg-accent5/100',
};

export function tailwindOverlayClasses(className: string): string {
  const classList = className.split(' ');

  let background = 'contrast1';
  let opacityValue = '50';

  // Map background color
  for (const wpClass of classList) {
    if (wpClass.startsWith('has-') && wpClass.endsWith('-background-color')) {
      const colorKey = wpClass
        .replace('has-', '')
        .replace('-background-color', '');
      background = colorKey || background;
    }
  }

  // Map overlay opacity
  for (const wpClass of classList) {
    if (wpClass.startsWith('has-background-dim-')) {
      opacityValue = wpClass.replace('has-background-dim-', '');
    }
  }

  return wordpressToTailwindColors[`${background}/${opacityValue}`];
}

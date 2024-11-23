import { CSSProperties } from 'react';

export function styleStringToObject(
  styleString?: string
): CSSProperties | undefined {
  if (!styleString) {
    return undefined; // Return `undefined` for no style
  }

  return Object.fromEntries(
    styleString
      .split(';')
      .map((style) => style.trim())
      .filter(Boolean)
      .map((style) => {
        const [property, ...valueParts] = style.split(':');
        const value = valueParts.join(':').trim();
        const camelCasedProperty = property
          .trim()
          .replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
        return [camelCasedProperty, value];
      })
  ) as CSSProperties;
}

export function styleStringToObject(
  styleString: string
): Record<string, string> {
  const styleObject: Record<string, string> = {};

  styleString.split(';').forEach((style: string) => {
    if (style.trim()) {
      const [property, value] = style.split(':');
      if (property && value) {
        const camelCasedProperty = property
          .trim()
          .replace(/-([a-z])/g, (_match: string, letter: string) =>
            letter.toUpperCase()
          );
        styleObject[camelCasedProperty] = value.trim();
      }
    }
  });

  return styleObject;
}

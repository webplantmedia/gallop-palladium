export function styleStringToObject(style: string) {
  const styleObject = Object.fromEntries(
    style.split(';').map((style) => {
      const [key, value] = style.split(':');
      return [key.trim(), value.trim()];
    })
  );

  return styleObject;
}

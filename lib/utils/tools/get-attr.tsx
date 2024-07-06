export function getAttr(name: string, block: any, defaultValue: any = null) {
  if (block && 'attrs' in block && name in block.attrs) {
    return block.attrs[name];
  }

  if (defaultValue) {
    return defaultValue;
  }

  return '';
}

export function hasClassName(name: string, block: any) {
  return (
    block &&
    'attrs' in block &&
    'className' in block.attrs &&
    block.attrs.className.match(name)
  );
}

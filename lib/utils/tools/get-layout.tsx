export function getLayout(name: string, block: any) {
  if (
    block &&
    'attrs' in block &&
    'layout' in block.attrs &&
    name in block.attrs.layout
  ) {
    return block.attrs.layout[name];
  }
}

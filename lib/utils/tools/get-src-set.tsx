export function getSrcSet(sizes: any) {
  const s = sizes.split(',');
  let srcsets: any = [];
  let imageWidth = 300;
  s.map((size: string, index: number) => {
    let parts = size.trim().split(' ');
    if (parts && parts[1]) {
      let match = parts[0].match(/(\d+)x(\d+)\.[jpe?gpng]+$/);
      if (match && match[2]) {
        let sizeWidth = Number(match[1]);
        let sizeHeight = Number(match[2]);
        srcsets.push({ src: parts[0], width: sizeWidth, height: sizeHeight });
      }
    }
  });
  return { srcsets };
}

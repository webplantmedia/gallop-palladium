export const shimmerGlow = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="myGradient" gradientTransform="rotate(20)">
      <stop offset="5%"  stop-color="#eee">
        <animate attributeName="stop-color" values="#EEEEEE; #CCCCCC; #EEEEEE" dur="2s" repeatCount="indefinite"></animate>
      </stop>
      <stop offset="95%" stop-color="#aaa">
        <animate attributeName="stop-color" values="#EEEEEE; #DDDDDD; #EEEEEE" dur="3s" repeatCount="indefinite"></animate>
      </stop>
    </linearGradient>
  </defs>

  <!-- Shapes -->
  <rect fill="url(#myGradient)" class="image" />
  <rect fill="url(#myGradient)" class="why-ingredient" />
  <rect fill="url(#myGradient)" class="title" />
  <rect fill="url(#myGradient)" class="description-first-line" />
  <rect fill="url(#myGradient)" class="description-second-line" />

  <!-- Author -->
  <circle fill="url(#myGradient)" class="avatar" />
  <rect fill="url(#myGradient)" class="author-name" />
  <rect fill="url(#myGradient)" class="date" />
</svg>

`;
export const shimmerDark = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#222" offset="20%" />
      <stop stop-color="#333" offset="50%" />
      <stop stop-color="#222" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#222" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e2cca2" offset="20%" />
      <stop stop-color="#efd9ac" offset="50%" />
      <stop stop-color="#e2cca2" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e2cca2" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

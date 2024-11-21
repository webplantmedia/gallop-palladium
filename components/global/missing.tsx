export function Paragraph() {
  return <span className="text-red-500 font-bold">*Missing paragraph</span>;
}
export function H1() {
  return <span className="text-red-500 font-bold">*Missing H1</span>;
}
export function H2() {
  return <span className="text-red-500 font-bold">*Missing H2</span>;
}
export function H3() {
  return <span className="text-red-500 font-bold">*Missing H3</span>;
}
export function H4() {
  return <span className="text-red-500 font-bold">*Missing H4</span>;
}
export function H5() {
  return <span className="text-red-500 font-bold">*Missing H5</span>;
}
export function H6() {
  return <span className="text-red-500 font-bold">*Missing H6</span>;
}
export function Button() {
  return <span className="text-red-500 font-bold">*Missing button</span>;
}
export function Image() {
  // Create a base64-encoded data URL for a responsive inline SVG with a light gray background
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
      <rect width="1000" height="1000" fill="#f5fab9" />
      <text x="50%" y="50%" text-anchor="middle" fill="#ef4444" font-size="30" font-family="Arial, sans-serif" dy=".3em">
        Missing wp-block-image
      </text>
    </svg>
  `;
  const dataImage = `data:image/svg+xml;base64,${btoa(svg)}`;

  return {
    className: '',
    src: dataImage,
    style: { maxWidth: '100%', height: 'auto' }, // Responsive styling
    width: '1000', // Default intrinsic size
    height: '1000',
    srcSet: '',
    sizes: null,
    alt: 'Missing wp-block-image',
    title: null,
  };
}
export function Milestone() {
  return <span className="text-red-500 font-bold">*Missing milestone</span>;
}

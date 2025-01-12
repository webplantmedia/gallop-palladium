import Iconify from '@components/iconify';
import QuoteIcon from '@iconify/icons-icon-park-outline/quote';
import classNames from 'classnames';
import { Heading, Paragraph as Pa, QuoteCitation } from '@components/common';

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
export function Content() {
  return {
    h3: {
      _jsx: (
        <Heading as="h3" className="!text-red-500 !font-bold">
          Heading
        </Heading>
      ),
      _text: 'Heading',
    },
    p: {
      _jsx: <Pa className="!text-red-500 !font-bold">Text</Pa>,
      _text: 'Text',
    },
  };
}
export function Quote() {
  return {
    p: {
      _jsx: <span className="text-red-500 font-bold">WPBlockQuote</span>,
      _text: 'WPBlockQuote',
    },
  };
}
/*export function Quote() {
  return (
    <blockquote
      className={classNames(
        'relative mt-16 mb-14 flex flex-wrap gap-2 pl-[30px] sm:pl-[90px] pr-[20px] sm:pr-[40px]'
      )}
    >
      <div className="relative">
        <div
          className="mr-0 pr-0 font-accent text-base-contrast/20 absolute leading-none -left-[30px] sm:-left-[90px] -top-[23px] sm:-top-[30px]"
          aria-hidden="true"
        >
          <Iconify className="w-16 h-16 sm:w-20 sm:h-20" icon={QuoteIcon} />
        </div>
        <Pa className="text-red-500 font-bold">Enter Quote</Pa>
        <QuoteCitation>Person</QuoteCitation>
      </div>
    </blockquote>
  );
}*/
export function BackgroundMedia() {
  // Create a base64-encoded data URL for a responsive inline SVG with a light gray background
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
      <rect width="1000" height="1000" fill="#f5fab9" />
      <text x="50%" y="50%" text-anchor="middle" fill="#ef4444" font-size="30" font-family="Arial, sans-serif" dy=".3em">
        Missing background media
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
export function MilestoneData(tag: string = 'h4') {
  return {
    prefix: '$',
    number: 999,
    decimals: 0,
    unit: 'M',
    suffix: `*Missing ${tag}`,
    error: '*:!text-red-500',
  };
}
export function Milestone() {
  return <span className="text-red-500 font-bold">*Missing milestone</span>;
}

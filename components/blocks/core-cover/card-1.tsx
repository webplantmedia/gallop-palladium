import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import { BlockProps } from '@lib/types';
import classNames from 'classnames';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { extractMilestone, getFontSize } from '@utils/tools';
import * as Missing from '@components/global/missing';
import {
  Alignment,
  Container,
  Heading,
  Paragraph,
  Button,
  BackgroundMedia,
  Overlay,
} from '@components/common';
import { objectMap } from '@utils/objectMap';
import { ReactElement } from 'react';

export const CoreCoverCard1 = ({ data, className }: any) => {
  let h2 = data?.wpBlockCoverInnerContainer?.h2?._text || Missing.H2();
  let buttonText =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._text ||
    Missing.Button();
  let buttonHref =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._href ||
    null;

  // Define bgColorClass with explicit type
  const bgColorClass: { [key: string]: string } = {
    'is-style-bg-accent': 'bg-accent/90 group-hover:bg-accent/80',
    'is-style-bg-red': 'bg-red-700/90 group-hover:bg-red-700/80',
    'is-style-bg-orange': 'bg-orange-700/90 group-hover:bg-orange-700/80',
    'is-style-bg-amber': 'bg-amber-700/90 group-hover:bg-amber-700/80',
    'is-style-bg-yellow': 'bg-yellow-700/90 group-hover:bg-yellow-700/80',
    'is-style-bg-lime': 'bg-lime-700/90 group-hover:bg-lime-700/80',
    'is-style-bg-green': 'bg-green-700/90 group-hover:bg-green-700/80',
    'is-style-bg-emerald': 'bg-emerald-700/90 group-hover:bg-emerald/80',
    'is-style-bg-teal': 'bg-teal-700/90 group-hover:bg-teal-700/80',
    'is-style-bg-cyan': 'bg-cyan-700/90 group-hover:bg-cyan-700/80',
    'is-style-bg-sky': 'bg-sky-700/90 group-hover:bg-sky-700/80',
    'is-style-bg-blue': 'bg-blue-700/90 group-hover:bg-blue-700/80',
    'is-style-bg-indigo': 'bg-indigo-700/90 group-hover:bg-indigo-700/80',
    'is-style-bg-violet': 'bg-violet-700/90 group-hover:bg-violet-700/80',
    'is-style-bg-purple': 'bg-purple-700/90 group-hover:bg-purple-700/80',
    'is-style-bg-fuchsia': 'bg-fuchsia-700/90 group-hover:bg-fuchsia-700/80',
    'is-style-bg-pink': 'bg-pink-700/90 group-hover:bg-pink-700/80',
    'is-style-bg-rose': 'bg-rose-700/90 group-hover:bg-rose-700/80',
  };

  // Determine the background color class
  const selectedKey = Object.keys(bgColorClass).find((key) =>
    className?.includes(key)
  ) as string | undefined;

  const selectedBgClass =
    (selectedKey && bgColorClass[selectedKey]) ||
    bgColorClass['is-style-bg-accent']; // Fallback if no match

  const card = (
    <a
      href={buttonHref}
      className={classNames(
        'relative w-full aspect-[3/4] flex flex-col justify-between p-7 rounded-xl group overflow-hidden drop-shadow-2xl transition-transform duration-200 ease-out hover:-translate-y-2',
        selectedBgClass
      )}
    >
      <BackgroundMedia wpBlockCover={data} grayscale={true} />
      <Overlay className={classNames('transition-all', selectedBgClass)} />
      <Heading
        className={`!mt-0 !text-3xl xl:!text-4xl text-white break-word ${getFontSize(
          h2
        )}`}
        as="h2"
      >
        {h2}
      </Heading>
      <span className="text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out flex items-center gap-1">
        {buttonText}
        <Iconify
          icon={ArrowInsertIcon}
          className="flex-shrink-0 h-auto w-6 text-white rotate-90"
        />
      </span>
    </a>
  );

  return card;
};

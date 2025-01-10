import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import { BlockProps } from '@lib/types';
import classNames from 'classnames';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { extractMilestone } from '@utils/tools';
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
  let h2 = data?.wpBlockCoverInnerContainer?.h2?._jsx || Missing.H2();
  let buttonText =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._text ||
    Missing.Button();
  let buttonHref =
    data?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a?._href ||
    null;

  var bgColorClass = [
    'bg-accent/90 group-hover:bg-accent/80',
    'bg-red-700/90 group-hover:bg-red-700/80',
    'bg-orange-700/90 group-hover:bg-orange-700/80',
    'bg-amber-700/90 group-hover:bg-amber-700/80',
    'bg-yellow-700/90 group-hover:bg-yellow-700/80',
    'bg-lime-700/90 group-hover:bg-lime-700/80',
    'bg-green-700/90 group-hover:bg-green-700/80',
    'bg-emerald-700/90 group-hover:bg-emerald-700/80',
    'bg-teal-700/90 group-hover:bg-teal-700/80',
    'bg-cyan-700/90 group-hover:bg-cyan-700/80',
    'bg-sky-700/90 group-hover:bg-sky-700/80',
    'bg-blue-700/90 group-hover:bg-blue-700/80',
    'bg-indigo-700/90 group-hover:bg-indigo-700/80',
    'bg-violet-700/90 group-hover:bg-violet-700/80',
    'bg-purple-700/90 group-hover:bg-purple-700/80',
    'bg-fushsia-700/90 group-hover:bg-fushsia-700/80',
    'bg-pink-700/90 group-hover:bg-pink-700/80',
    'bg-rose-700/90 group-hover:bg-rose-700/80',
  ];
  // const selectedBgClass = bgColorClass[index % bgColorClass.length];
  const selectedBgClass =
    bgColorClass[Math.floor(Math.random() * bgColorClass.length)];

  const card = (
    <a
      href={buttonHref}
      className={classNames(
        'relative w-full aspect-[3/4] flex flex-col justify-between p-7 rounded-xl group overflow-hidden drop-shadow-2xl transition-transform duration-200 ease-out hover:-translate-y-2',
        selectedBgClass
      )}
    >
      <BackgroundMedia wpBlockCover={data} />
      <Overlay className={classNames('transition-all', selectedBgClass)} />
      <Heading className="!mt-0 !text-4xl text-white" as="h2">
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

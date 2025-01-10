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
  Overlay2,
} from '@components/common';
import { objectMap } from '@utils/objectMap';
import { ReactElement } from 'react';

export const CoreGroupSection4 = ({ data, className, props }: BlockProps) => {
  let h1 = data?.h1?._jsx || Missing.H1();
  let p = data?.p?._jsx || Missing.Paragraph();
  let column1: Array<ReactElement> = [];
  let column2: Array<ReactElement> = [];
  let column3: Array<ReactElement> = [];
  let column4: Array<ReactElement> = [];
  let column5: Array<ReactElement> = [];
  data?.wpBlockGroup &&
    objectMap(data.wpBlockGroup, (key, item, index) => {
      let h2 = item?.wpBlockCoverInnerContainer?.h2?._jsx || Missing.H2();
      let buttonText =
        item?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a
          ?._text || Missing.Button();
      let buttonHref =
        item?.wpBlockCoverInnerContainer?.wpBlockButtons?.wpBlockButton?.a
          ?._href || null;

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
      const selectedBgClass = bgColorClass[index % bgColorClass.length];

      const card = (
        <a
          href={buttonHref}
          className="relative w-full aspect-[3/4] flex flex-col justify-between p-7 rounded-xl group overflow-hidden drop-shadow-2xl transition-transform duration-200 ease-out hover:-translate-y-2"
        >
          <BackgroundMedia wpBlockCover={item} />
          <Overlay2 className={classNames('transition-all', selectedBgClass)} />
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

      if (index < 1) {
        column1.push(card);
      } else if (index < 3) {
        column2.push(card);
      } else if (index < 5) {
        column3.push(card);
      } else if (index < 8) {
        column4.push(card);
      } else if (index < 11) {
        column5.push(card);
      }
    });

  return (
    <Alignment align="full" className="relative isolate">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
      >
        <div
          style={{
            clipPath:
              'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
          }}
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-accent to-accent-gradient opacity-30"
        />
      </div>
      <Container as="div" width="wide" className="">
        <div className="mx-auto pb-32 pt-36 sm:pt-60 lg:pt-32">
          <div className="mx-auto max-w-none gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-start justify-between flex flex-col">
            <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
              <Heading className="" as="h1">
                {h1}
              </Heading>
              <Paragraph as="large" className="mt-8 sm:max-w-md lg:max-w-none">
                {p}
              </Paragraph>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-1/5 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-40 lg:order-last lg:pt-36 xl:order-none xl:pt-40">
                {column1}
              </div>
              <div className="mr-auto w-1/5 flex-none space-y-8 sm:mr-0 sm:pt-24 lg:pt-24">
                {column2}
              </div>
              <div className="w-1/5 flex-none space-y-8 pt-32 sm:pt-0">
                {column3}
              </div>
              <div className="w-1/5 flex-none space-y-8 pt-32 sm:pt-0 -mt-80">
                {column4}
              </div>
              <div className="w-1/5 flex-none space-y-8 pt-32 sm:pt-0 -mt-96">
                {column5}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Alignment>
  );
};

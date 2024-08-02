import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { replaceWordPressUrl } from '@utils/tools';
import Link from 'next/link';
import { replaceWordPressUrlRelative } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import { getVarsFromHTML } from '@utils/tools';

export const CoreGroupHero1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  console.log(data);

  return (
    <div className={classNames(className, 'relative overflow-clip')}>
      {data.wpBlockCover?.video && (
        <video
          className={classNames(
            'w-full object-cover object-center h-full absolute inset-0 !max-w-none !p-0'
          )}
          autoPlay
          muted
          loop
          playsInline
          src={data.wpBlockCover.video.src}
          data-object-fit="cover"
        ></video>
      )}
      <div className="absolute inset-0 h-full w-full !max-w-none bg-black/30"></div>
      <div className="relative flex flex-row !max-w-screen-3xl py-40">
        <div className="w-1/2">
          {data.wpBlockCover?.wpBlockGroup &&
            data.wpBlockCover.wpBlockGroup.map((group: any, index: number) => {
              console.log(group);
              return (
                <div key={`hero-1-group-${index}`} className="flex flex-col">
                  {group?.p[0]?.strong?.text && (
                    <strong className="mb-7 leading-tight text-4xl font-bold text-white">
                      {group.p[0].strong.text}
                    </strong>
                  )}
                  {group?.h1?.text && (
                    <h1 className="mb-7 leading-tight text-4xl md:text-5xl lg:text-6xl text-base-contrast font-bold">
                      {group.h1.text}
                    </h1>
                  )}
                  {group?.h2?.text && (
                    <h2 className="mb-7 leading-tight text-4xl md:text-5xl lg:text-6xl text-base-contrast font-bold">
                      {group.h2.text}
                    </h2>
                  )}
                  {group?.p[1]?.strong?.text && (
                    <p className="mb-7 leading-tight text-4xl font-bold text-white">
                      {group?.p[1]?.strong?.text}
                    </p>
                  )}
                </div>
              );
            })}
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
};

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

export const CoreGroupHero1 = ({ node, className, props, options }) => {
  const data = getVarsFromHTML(node);
  console.log(data);
  return <></>;
  /*

  return (
    <Link
      prefetch={false}
      className={classNames(
        'flex flex-row gap-4 items-center w-full justify-between bg-base-card rounded-md pr-4 py-4 group mb-7 shadow-lg',
        src ? 'pl-4' : 'pl-6'
      )}
      href={href}
    >
      {src && (
        <figure className="h-[100px] w-[100px] shrink-0">
          <img
            className={classNames(
              'aspect-square object-cover object-center box-border rounded-full',
              'min-w-full'
            )}
            loading="lazy"
            src={src}
          />
        </figure>
      )}
      <div className="w-full flex flex-row gap-3 items-center">
        <div
          className={classNames(
            'h-full flex flex-col justify-center text-base text-base-contrast w-full'
          )}
        >
          {heading && <span>{heading}</span>}
          {paragraph &&
            paragraph.map((item: string, index: number) => (
              <span className="block text-sm" key={index}>
                {item}
              </span> // You can also use <p> instead of <div> here
            ))}
        </div>
        <span
          className={classNames(
            'chevron-right shrink-0 hidden md:flex h-auto items-center justify-end right-8 md:right-0 self-center'
          )}
        >
          <span className="rounded-full bg-white/20 group-hover:bg-base-contrast/20 p-2">
            <ChevronRightIcon
              className={
                'h-7 w-7 relative text-base-contrast group-hover:text-white'
              }
            />
          </span>
        </span>
      </div>
    </Link>
	);*/
};

import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { replaceWordPressUrl } from '@utils/tools';
import Link from 'next/link';

export const GallopNeighborhood = ({ node, className, props, options }) => {
  let { href } = props;
  let heading: any = [];
  let paragraph: any = [];
  let figure: any = [];

  node.map((block: any, index: number) => {
    if (block.name === 'figure') {
      figure.push(block);
    } else if (block.name === 'div' && block.children) {
      block.children.map((el: any, index2: number) => {
        if (el.name == 'h3') {
          heading.push(el);
        } else if (el.name == 'p') {
          paragraph.push(el);
        }
      });
    }
  });

  let isLowerTier = false;
  let tier = 1;
  if (className?.includes('is-style-tier-2')) {
    tier = 2;
    isLowerTier = true;
  } else if (className?.includes('is-style-tier-3')) {
    tier = 3;
    isLowerTier = true;
  } else if (className?.includes('is-style-tier-4')) {
    tier = 4;
    isLowerTier = true;
  }

  if (tier == 1 && !className?.includes('is-style-tier-1')) {
    className += ' is-style-tier-1';
  }

  href = replaceWordPressUrl(href);
  return (
    <Link
      prefetch={true}
      className={classNames(
        className,
        'relative group block',
        tier == 2 ? 'pl-0 block' : '',
        tier == 3 ? 'pl-0 md:pl-8 block' : '',
        tier == 4 ? 'pl-0 md:pl-16 block' : '',
        isLowerTier
          ? '[&+.wp-block-gallop-neighborhood.is-style-tier-1>div]:mt-8 mt-4'
          : '',
        !isLowerTier
          ? '[&+.wp-block-gallop-neighborhood>.left-bar]:-top-8 [&+.wp-block-gallop-neighborhood]:mt-8'
          : ''
      )}
      href={href}
    >
      {isLowerTier && (
        <>
          <span className="left-bar absolute w-3 left-0 bottom-0 -top-4 bg-base-contrast/10"></span>
          <span
            className={classNames(
              'horizontal-bar absolute h-3 left-3 top-1/2 -mt-1.5 bg-base-contrast/10',
              tier == 2 ? 'w-5' : '',
              tier == 3 ? 'w-14' : '',
              tier == 4 ? 'w-24' : ''
            )}
          ></span>
        </>
      )}
      <div
        className={classNames(
          'relative grid [&_h3]:!mt-0 [&>figure]:!mb-0  [&_.heading-paragraph-wrapper>p]:mb-0',
          tier == 1
            ? 'gap-6 md:gap-8 mb-0 bg-white/10 shadow-lg rounded-sm grid-cols-[1fr] md:grid-cols-[30%_1fr] items-start md:items-start p-8 group-hover:bg-white/20'
            : '',
          tier == 2
            ? 'grid-cols-[7rem_1fr] md:grid-cols-[7rem_1fr] [&_figure]:!w-28 [&_figure]:!h-28 [&_h3]:text-2xl [&_h3]:leading-tight [&_h3]:md:text-2xl'
            : '',
          tier == 3
            ? 'grid-cols-[5rem_1fr] md:grid-cols-[5rem_1fr] [&_figure]:!w-20 [&_figure]:!h-20 [&_h3]:text-lg [&_h3]:leading-tight [&_h3]:md:text-2xl'
            : '',
          tier == 4
            ? 'grid-cols-[5rem_1fr] md:grid-cols-[5rem_1fr] [&_figure]:!w-20 [&_figure]:!h-20 [&_h3]:text-lg [&_h3]:leading-tight [&_h3]:md:text-2xl'
            : '',
          isLowerTier
            ? 'gap-4 md:gap-4 items-center py-0 pl-8 pr-0 md:pr-8 [&_img]:!aspect-square [&_img]:!object-center [&_img]:!object-cover [&_img]:!absolute [&>figure]:!relative group-hover:[&_h3]:lg:text-primary-main group-visited:[&_h3]:!text-base-contrast group-focus:[&_h3]:!text-base-contrast group-active:[&_h3]:!text-base-contrast'
            : ''
        )}
      >
        {figure && domToReact(figure as DOMNode[], options)}
        <div className="flex flex-row h-full gap-4 items-center w-full justify-between">
          <div
            className={classNames(
              'heading-paragraph-wrapper md:mb-0 h-full flex flex-col justify-center'
            )}
          >
            {heading && domToReact(heading as DOMNode[], options)}
            {!isLowerTier &&
              paragraph &&
              domToReact(paragraph as DOMNode[], options)}
          </div>
          <span
            className={classNames(
              'chevron-right shrink-0 hidden md:flex h-auto items-center justify-end right-8 md:right-0 self-center'
            )}
          >
            <span className="rounded-full bg-white/20 group-hover:bg-base-contrast/20 p-2">
              <ChevronRightIcon
                className={
                  'h-7 w-7 left-0.5 relative text-base-contrast group-hover:text-white'
                }
              />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

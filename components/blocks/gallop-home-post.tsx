import classNames from 'classnames';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Iconify from '@components/iconify';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import { domToReact, DOMNode } from 'html-react-parser';
import Link from 'next/link';
import { Fragment } from 'react';
import {
  CoreHeading,
  CoreParagraph,
  TagAnchor,
  CoreImage,
} from '@components/blocks';
import { replaceWordPressUrl } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

const CoreList = ({ node, className, tag, options }) => {
  return (
    <ul
      role="list"
      className={classNames(
        className,
        'leading-normal mb-7 flex flex-col gap-2'
      )}
    >
      {node?.map((block: any, index: number) => {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          block.attribs
        );
        let spanClasses = '';
        let strongClasses = '';

        return (
          <Fragment key={'core-media-list-ul' + index}>
            {block.name == 'li' && (
              <li className="flex gap-x-3 items-start" key={'li-' + index}>
                <span className="w-3 shrink-0 mt-[0.45rem]">
                  <Iconify
                    className="text-primary-main dmh:text-modern-primary-main w-3 h-3"
                    icon={dotMarkIcon}
                  />
                </span>
                <span className="">
                  {block?.children?.map((el: any, index2: number) => {
                    if (el.name == 'strong') {
                      switch (el.children[0].data) {
                        case 'Status:':
                          spanClasses = 'text-primary-main';
                          break;
                      }
                    }
                    return (
                      <Fragment key={'core-media-list-li-' + index2}>
                        {el.name == 'strong' && (
                          <strong
                            className={classNames('font-normal', strongClasses)}
                          >
                            {domToReact(el?.children as DOMNode[], options)}{' '}
                          </strong>
                        )}
                        {el.name == 'span' && (
                          <span className={spanClasses}>
                            {domToReact(el?.children as DOMNode[], options)}{' '}
                          </span>
                        )}
                      </Fragment>
                    );
                  })}
                </span>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export const GallopHomePost = ({ node, className, id, props, options }) => {
  let heading: any;
  let paragraph: any;
  let figure: any;
  let ul: any;
  let href = '';
  let linkTo = 'home';

  if ('data-link-to' in props) {
    linkTo = props['data-link-to'];
  }

  node.map((block: any, index: number) => {
    const props: HTMLAttributeProps = castToHTMLAttributeProps(block.attribs);
    const { className } = props;
    if (block.name === 'a' && block.children) {
      ({ href } = props);
      href = replaceWordPressUrl(href);
      if (linkTo == 'dallas-modern-home') {
        href = href.replace('/home/', '/dallas-modern-home/');
      }
      block.children.map((el: any, index2: number) => {
        if (el.name == 'figure') {
          figure = (
            <Link prefetch={false} href={href}>
              <CoreImage
                tag={el.name}
                className={classNames(
                  className,
                  '!mb-0 [&_img]:!rounded-none [&_img]:block'
                )}
                node={el}
                options={options}
              />
            </Link>
          );
        }
      });
    } else if (block.name === 'ul' && block.children) {
      ul = (
        <CoreList
          tag={block.name}
          className={classNames('!mb-0', className)}
          node={block.children}
          options={options}
        />
      );
    } else if (className?.includes('wp-block-heading')) {
      heading = (
        <CoreHeading
          tag={block.name}
          className={classNames(className, '!mb-0')}
          props={props}
        >
          {domToReact(block.children as DOMNode[], options)}
        </CoreHeading>
      );
    } else if (block.name == 'p') {
      paragraph = (
        <CoreParagraph className={classNames(className, '!mb-0')}>
          {domToReact(block.children as DOMNode[], options)}
        </CoreParagraph>
      );
    }
  });

  return (
    <div
      id={id}
      className={classNames(
        className,
        'flex flex-col gap-7',
        false && '[&_img]:object-center [&_img]:object-cover [&_img]:aspect-4/3'
      )}
    >
      {figure && figure}
      {heading && (
        <Link prefetch={false} href={href}>
          {heading}
        </Link>
      )}
      <div className="flex flex-col gap-7 md:gap-14 md:flex-row">
        <div className="block basis-1/2">{paragraph && paragraph}</div>
        <div className="block basis-1/2">{ul && ul}</div>
      </div>
      <a
        href={href}
        className="mt-7 bg-secondary-main text-secondary-contrast hover:bg-secondary-light text-base py-3 px-5 w-full text-center rounded-md shadow-sm flex items-center justify-center dmh:bg-modern-primary-main dmh:text-modern-primary-contrast hover:dmh:bg-modern-primary-light max-w-[750px] mx-auto"
      >
        See Article and Photographs of Home
        <ArrowRightIcon
          className="ml-1 -mr-1 h-5 w-5 text-primary-contrast"
          aria-hidden="true"
        />
      </a>
    </div>
  );
};

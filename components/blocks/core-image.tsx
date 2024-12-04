import { replaceWordPressUrl, getAlign } from '@utils/tools';
import classNames from 'classnames';
import Link from 'next/link';
import { BlockProps } from '@lib/types';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import { Image } from '@components/common';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

export const coreImage = (
  domNode: Element,
  className: string,
  parentTag?: string | undefined
) => {
  let hasCaption = false;
  let style = {};

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );

        if (domNode.name === 'img') {
          if (props.width && props.height) {
            if (props.style.width) {
              style = { width: props.style.width, maxWidth: '100%' };
            }

            return <Image className="max-w-full box-border" attr={props} />;
          }
        } else if (domNode.name === 'figcaption') {
          hasCaption = true;

          return (
            <figcaption
              className={classNames(
                props.className,
                'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md w-auto'
              )}
            >
              {domToReact(domNode.children as DOMNode[], op)}
            </figcaption>
          );
        } else if (domNode.name === 'a') {
          const { href, target } = props;
          let href2 = href;

          let hasImageSrcLink =
            href && href.match(/\.jpe?g$|\.png$/) ? true : false;

          if (!hasImageSrcLink && href) {
            href2 = replaceWordPressUrl(href);
          }

          return (
            <Link
              href={href2}
              prefetch={false}
              {...(target ? { target } : {})}
              className={classNames(
                'block',
                '[&_img]:!h-auto',
                hasImageSrcLink ? 'lightbox-content' : ''
              )}
            >
              {domToReact(domNode.children as DOMNode[], op)}
            </Link>
          );
        }
      }
    },
  };

  const content = domToReact(domNode?.children as DOMNode[], op);

  return (
    <CoreImage
      content={content}
      hasCaption={hasCaption}
      style={style}
      className={className}
      parentTag={parentTag}
    />
  );
};

export const CoreImage = ({
  content,
  hasCaption,
  style,
  className,
  parentTag,
}: {
  content: any;
  hasCaption: any;
  style: any;
  className: any;
  parentTag?: string | undefined;
}) => {
  const defaultAlign = parentTag ? 'none' : 'content';
  const { align, alignment } = getAlign(className, defaultAlign);

  // className = className.replace(
  // 'alignleft',
  // 'alignleft md:float-left md:w-[300px] xl:w-auto md:!mr-5 mt-1.5 md:!pr-0'
  // );
  // className = className.replace(
  // 'alignright',
  // 'alignright md:float-right md:w-[300px] xl:w-auto md:!ml-5 mt-1.5 md:!pl-0'
  // );
  // className = className.replace('size-full', 'image-size-full');

  let imgClass = '';

  if (className.includes('is-style-rounded')) {
    if (hasCaption) {
      imgClass = '[&_img]:rounded-t-2xl';
    } else {
      imgClass = '[&_img]:rounded-2xl';
    }
  } else {
    if (hasCaption) {
      imgClass = '[&_img]:rounded-t-sm';
    } else {
      imgClass = '[&_img]:rounded-sm';
    }
  }

  return (
    <figure
      className={classNames(
        alignment,
        'flex flex-col box-border',
        'break-inside-avoid',
        hasCaption ? 'mb-12' : 'mb-7',
        imgClass,
        !parentTag && 'items-center table'
      )}
      style={style}
    >
      {content}
    </figure>
  );
};

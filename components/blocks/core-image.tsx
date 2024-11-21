import { replaceWordPressUrl } from '@utils/tools';
import classNames from 'classnames';
import Link from 'next/link';
import { BlockProps } from '@lib/types';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

interface ImageBlockProps extends BlockProps {
  block?: any;
  hasCaption?: string;
  marginClass?: string;
}

export const coreImage = (
  domNode: Element,
  options: HTMLReactParserOptions
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

            return (
              <img
                className={classNames(props.className, 'max-w-full box-border')}
                loading="lazy"
                src={props.src}
                style={props.style}
                width={parseInt(props.width)}
                height={parseInt(props.height)}
                srcSet={props.srcSet}
                sizes={props.sizes}
                alt={props.alt}
                title={props.title}
              />
            );
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

  return { content, hasCaption, style };
};

export const CoreImage = ({
  content,
  hasCaption,
  style,
  className,
}: {
  content: any;
  hasCaption: any;
  style: any;
  className: any;
}) => {
  className = className.replace(
    'alignleft',
    'alignleft md:float-left md:w-[300px] xl:w-auto md:!mr-5 mt-1.5 md:!pr-0'
  );
  className = className.replace(
    'alignright',
    'alignright md:float-right md:w-[300px] xl:w-auto md:!ml-5 mt-1.5 md:!pl-0'
  );
  className = className.replace('size-full', 'image-size-full');

  return (
    <figure
      className={classNames(
        'flex flex-col box-border',
        className,
        'break-inside-avoid',
        hasCaption ? '[&_img]:rounded-t-sm mb-12' : '[&_img]:rounded-sm mb-7'
      )}
      style={style}
    >
      {content}
    </figure>
  );
};

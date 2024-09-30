import { domToReact, DOMNode } from 'html-react-parser';
import classNames from 'classnames';
import { Fragment } from 'react';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import VimeoHandler from '@components/vimeo-handler';
import { BlockProps } from '@lib/types';

export const CoreEmbed = ({ node, tag, className, options }: BlockProps) => {
  className = className.replace(
    'wp-block-embed',
    'wp-block-embed [&_iframe]:w-full [&_iframe]:h-auto'
  );
  className = className.replace(
    'wp-embed-aspect-16-9',
    '[&_iframe]:aspect-video'
  );
  className = className.replace('wp-embed-aspect-4-3', '[&_iframe]:aspect-4/3');

  const appendVimeoParams = (url: string) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set('muted', '1');
    urlObj.searchParams.set('title', '0');
    urlObj.searchParams.set('byline', '0');
    urlObj.searchParams.set('portrait', '0');
    urlObj.searchParams.set('background', '1');
    return urlObj.toString();
  };

  return (
    <Fragment>
      <figure className={classNames(className, 'mb-7')}>
        {node?.children?.map((block: any, index: number) => {
          const props: HTMLAttributeProps = castToHTMLAttributeProps(
            block.attribs
          );
          if (
            block.children[0].name === 'iframe' &&
            block.children[0].attribs.src.includes('vimeo.com')
          ) {
            block.children[0].attribs.src = appendVimeoParams(
              block.children[0].attribs.src
            );
          }
          return (
            <Fragment key={'core-figure-' + index}>
              {props?.className?.includes('wp-block-embed__wrapper') && (
                <div className={classNames(props.className)}>
                  {domToReact(block?.children as DOMNode[], options)}
                </div>
              )}
              {block.name === 'figcaption' && (
                <figcaption
                  className={classNames(
                    props.className,
                    'text-left text-sm italic px-3 py-3 bg-white/20 rounded-b-md'
                  )}
                >
                  {domToReact(block?.children as DOMNode[], options)}
                </figcaption>
              )}
            </Fragment>
          );
        })}
      </figure>
      <VimeoHandler /> {/* Add the Vimeo handler here */}
    </Fragment>
  );
};

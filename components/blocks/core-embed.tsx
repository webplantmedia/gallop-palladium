import { domToReact, DOMNode } from 'html-react-parser';
import classNames from 'classnames';
import { Fragment } from 'react';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const CoreEmbed = ({ node, tag, className, options }) => {
  // <iframe
  // className="w-full aspect-video mb-2 shadow-lg"
  // src={'https://www.youtube.com/embed/' + videoCode}
  // ></iframe>
  // <figcaption
  // className="text-sm"
  // dangerouslySetInnerHTML={{ __html: content }}
  // />

  className = className.replace(
    'wp-block-embed',
    'wp-block-embed [&_iframe]:w-full [&_iframe]:h-auto'
  );
  className = className.replace(
    'wp-embed-aspect-16-9',
    '[&_iframe]:aspect-video'
  );
  className = className.replace('wp-embed-aspect-4-3', '[&_iframe]:aspect-4/3');
  return (
    <figure className={classNames(className, 'mb-7')}>
      {node?.map((block: any, index: number) => {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          block.attribs
        );
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
  );
};

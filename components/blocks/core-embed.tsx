import classNames from 'classnames';
import { Fragment } from 'react';
import VimeoHandler from '@components/vimeo-handler';
import { BlockProps } from '@lib/types';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { HTMLAttributeProps } from '@lib/types';
import {
  castToHTMLAttributeProps,
  hasExactClass,
  tailwindAlignClasses,
} from '@utils/tools';

const appendVimeoParams = (url: string) => {
  const urlObj = new URL(url);
  urlObj.searchParams.set('muted', '1');
  urlObj.searchParams.set('title', '0');
  urlObj.searchParams.set('byline', '0');
  urlObj.searchParams.set('portrait', '0');
  urlObj.searchParams.set('background', '1');
  return urlObj.toString();
};

export const coreEmbed = (
  domNode: Element,
  options: HTMLReactParserOptions
) => {
  let videoProps: any = null;
  let figcaption: React.ReactElement | null = null;
  let content: React.ReactElement | null = null;
  let wrapper: React.ReactElement | null = null;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'iframe') {
          videoProps = props;
          let { src } = props;
          props.src = appendVimeoParams(src);
        } else if (
          hasExactClass(className, 'wp-block-embed__wrapper') &&
          !wrapper
        ) {
          wrapper = <>{domToReact(domNode.children as DOMNode[], op)}</>;
          return <></>;
        }
        if (domNode.name === 'figcaption' && !figcaption) {
          figcaption = <>{domToReact(domNode.children as DOMNode[], op)}</>;
          return <></>;
        }
      }
    },
  };

  domToReact(domNode?.children as DOMNode[], op);

  return { videoProps: videoProps, figcaption: figcaption, wrapper: wrapper };
};

export const CoreEmbed = ({
  videoProps,
  wrapper,
  figcaption,
  className,
}: any) => {
  className = tailwindAlignClasses(className);
  className = className?.replace(
    'wp-block-embed',
    'wp-block-embed [&_iframe]:w-full [&_iframe]:h-auto'
  );
  className = className?.replace(
    'wp-embed-aspect-16-9',
    '[&_iframe]:aspect-video'
  );
  className = className?.replace(
    'wp-embed-aspect-4-3',
    '[&_iframe]:aspect-4/3'
  );

  return (
    <Fragment>
      <figure className={classNames(className, 'mb-7')}>
        {wrapper && <div className={classNames()}>{wrapper}</div>}
        {figcaption && (
          <figcaption
            className={classNames(
              'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md'
            )}
          >
            {figcaption}
          </figcaption>
        )}
      </figure>
    </Fragment>
  );
};

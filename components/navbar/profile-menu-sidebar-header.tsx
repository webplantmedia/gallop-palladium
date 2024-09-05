'use client';

import classNames from 'classnames';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';

export default function ProfileMenuSidebarHeader({ post }) {
  if (!post) {
    return <></>;
  }
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-gallery')) {
          return (
            <div className="flex -space-x-2">
              {domToReact(domNode.children as DOMNode[], options)}
            </div>
          );
        } else if (hasExactClass(className, 'wp-block-image')) {
          return (
            <figure>
              {domToReact(domNode.children as DOMNode[], options)}
            </figure>
          );
        } else if (domNode.name === 'img') {
          return (
            <img
              className={classNames(
                className,
                'inline-block h-10 w-10 rounded-full ring-2 ring-white'
              )}
              alt={props.alt}
              src={props.src}
              srcSet={props.srcSet}
              sizes={props.sizes}
              width={props.width}
              height={props.height}
            />
          );
        }
      }
    },
  };
  const html = parse(post.postContent, options);

  return <>{html}</>;
}

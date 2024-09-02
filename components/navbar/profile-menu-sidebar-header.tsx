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
import { getVarsFromHTML } from '@utils/tools';

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
        }
        if (hasExactClass(className, 'wp-block-image')) {
          const data = getVarsFromHTML(domNode);

          var img: any = {};
          if (data?.img) {
            img = { ...data?.img };
          }

          return img ? (
            <img
              className={classNames(
                className,
                'inline-block h-10 w-10 rounded-full ring-2 ring-white'
              )}
              alt={img.alt}
              src={img.src}
              srcSet={img.srcset}
              sizes={img.sizes}
              width={img.width}
              height={img.height}
            />
          ) : (
            <p>No Image</p>
          );
        }

        return <></>;
      }
    },
  };
  const html = parse(post.postContent, options);

  return <>{html}</>;
}

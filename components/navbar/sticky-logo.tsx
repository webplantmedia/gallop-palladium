import classNames from 'classnames';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { getVarsFromNode } from '@utils/tools';

export default function StickyLogo({ post, className }: any) {
  if (!post) {
    return <></>;
  }

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className: classes } = props;

        if (hasExactClass(classes, 'wp-block-image')) {
          const data = getVarsFromNode(domNode);

          var img: any = {};
          if (data?.img) {
            img = { ...data?.img };
          }

          return img ? (
            <img
              className={classNames(classes, className)}
              alt={img.alt}
              src={img.src}
              srcSet={img.srcset}
              // sizes={img.sizes}
              width={img.width}
              height={img.height}
            />
          ) : (
            <p>No Image</p>
          );
        }

        return <p>Need Image</p>;
      }
    },
  };
  const html = parse(post.postContent, options);

  return <>{html}</>;
}

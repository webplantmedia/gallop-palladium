import classNames from 'classnames';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { getVarsFromNode } from '@utils/tools';

export default function Logo({ post, className }: any) {
  let img: React.ReactElement | null = null;

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className: classes } = props;

        if (domNode.name === 'img') {
          let { width, height } = props;

          if (width && height) {
            img = (
              <img
                className={classNames(
                  props.className,
                  'block size-full object-cover'
                )}
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
          return <p>No Image</p>;
        }
      }
    },
  };

  parse(post.postContent, options);

  return <>{img}</>;
}

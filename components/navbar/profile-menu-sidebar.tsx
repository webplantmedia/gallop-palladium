import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import classNames from 'classnames';
import { getDomNodeText } from '@utils/tools';
import {
  GallopContactForm,
  GallopAccordion,
  GallopSeeMore,
  CoreParagraph,
} from '@components/blocks';

export default function ProfileMenuSidebar({ sidebar, closeModal }: any) {
  if (!sidebar) {
    return <></>;
  }

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'is-style-see-more')) {
          return <GallopSeeMore node={domNode} props={props} />;
        } else if (domNode.name === 'p') {
          return (
            <CoreParagraph className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreParagraph>
          );
        } else if (domNode.name === 'h2') {
          return (
            <h2
              className={classNames(
                className,
                'leading-tight text-base text-primary-main mb-7 mt-2'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </h2>
          );
        } else if (domNode.name === 'h3') {
          return (
            <h3
              className={classNames(
                className,
                'leading-tight text-2xl text-base-contrast mt-9 mb-5'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </h3>
          );
        } else if (domNode.name === 'img') {
          return (
            <img
              className={classNames(className, 'rounded-sm mb-3')}
              alt={props.alt}
              src={props.src}
              srcSet={props.srcSet}
              // sizes={props.sizes}
              width={props.width}
              height={props.height}
            />
          );
        } else if (hasExactClass(className, 'is-style-accordion')) {
          return <GallopAccordion node={domNode} props={props} />;
        } else if (hasExactClass(className, 'wp-block-code')) {
          const text = getDomNodeText(domNode);
          if (text) {
            switch (text) {
              case 'contact-form':
                return <GallopContactForm />;
            }
          }
        } else if (domNode.name === 'hr') {
          return <hr className="border-base-contrast border mt-10 mb-10" />;
        } else {
          return <>{domToReact(domNode.children as DOMNode[], options)}</>;
        }
      }
    },
  };
  const html = parse(sidebar.postContent, options);

  return <>{html}</>;
}

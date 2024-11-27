import { BlockProps } from '@lib/types';
import { GallopMapClient } from './gallop-map-client';
import { tailwindGetAlignClasses } from '@utils/tools';
import classNames from 'classnames';
import { ReactElement, isValidElement } from 'react';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { tailwindAlignClasses, getDomNodeText } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const gallopMap = (
  domNode: Element,
  options: HTMLReactParserOptions
) => {
  let address: string = '';
  let heading: ReactElement | null = null;
  let description: ReactElement | null = null;
  let image: ReactElement | null = null;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'p') {
          const content = domToReact(domNode?.children as DOMNode[], options);
          description = <p className="text-xs">{content}</p>;
          return <></>;
        } else if (domNode.name === 'img') {
          const content = (
            <img
              className={classNames(
                props.className,
                '!mb-0 !max-w-full aspect-4/3 object-cover object-center'
              )}
              loading="lazy"
              src={props.src}
              style={props.style}
              width={parseInt(props.width)}
              height={parseInt(props.height)}
              srcSet={props.srcSet}
              // sizes={props.sizes}
              alt={props.alt}
              title={props.title}
            />
          );
          if (isValidElement(content)) {
            image = content;
          }
        } else if (domNode.name === 'h2') {
          const content = domToReact(domNode?.children as DOMNode[], options);
          heading = (
            <h3 className="text-base-contrast text-sm font-bold leading-snug mb-1">
              {content}
            </h3>
          );
          return <></>;
        } else if (domNode.name === 'h3') {
          address = getDomNodeText(domNode);
          return <></>;
        }
      }
    },
  };

  domToReact(domNode?.children as DOMNode[], op);

  return {
    address: address,
    heading: heading,
    description: description,
    image: image,
  };
};
export const GallopMap = ({
  address,
  heading,
  description,
  image,
  className,
}: {
  address: any;
  heading: any;
  description: any;
  image: any;
  className: any;
}) => {
  className = tailwindGetAlignClasses(className);

  return (
    <div className={classNames('mb-0', className)}>
      <div className="relative rounded-b-none overflow-clip w-full aspect-square lg:aspect-[16/7] h-full">
        <GallopMapClient
          address={address}
          heading={heading}
          image={image}
          description={description}
        />
      </div>
    </div>
  );
};

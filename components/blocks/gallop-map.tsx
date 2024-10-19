import { BlockProps } from '@lib/types';
import { GallopMapClient } from './gallop-map-client';
import { tailwindGetAlignClasses } from '@utils/tools';
import classNames from 'classnames';
import { CoreImage } from '@components/blocks';
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

export const GallopMap = ({ node, options, className, props }: BlockProps) => {
  className = tailwindGetAlignClasses(className);
  let address: string = '';
  let heading: ReactElement | null = null;
  let description: ReactElement | null = null;
  let image: ReactElement | null = null;
  let zoom: number = 12;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'p') {
          const content = domToReact(domNode?.children as DOMNode[], options);
          description = <p className="text-xs pb-2 px-2">{content}</p>;
          return <></>;
        } else if (className?.includes('wp-block-image')) {
          console.log(domNode.name);
          className = tailwindAlignClasses(className);
          const content = (
            <CoreImage
              className={classNames(className, '[&_img]:!max-w-full !mb-2')}
              node={domNode}
              options={options}
            />
          );
          if (isValidElement(content)) {
            image = content;
          }
        } else if (domNode.name === 'h2') {
          const content = domToReact(domNode?.children as DOMNode[], options);
          heading = (
            <h3 className="text-base-contrast text-sm font-bold mb-2 pt-2 px-4">
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

  domToReact(node?.children as DOMNode[], op);

  return (
    <div className={classNames('mb-14', className)}>
      <div className="relative rounded-b-none overflow-clip w-full aspect-video h-full">
        <GallopMapClient
          address={address}
          zoom={zoom}
          heading={heading}
          image={image}
          description={description}
        />
      </div>
    </div>
  );
};

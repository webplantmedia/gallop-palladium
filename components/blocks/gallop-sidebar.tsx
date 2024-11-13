import { hasExactClass, tailwindAlignClasses } from '@utils/tools';
import React from 'react';
import DynamicSidebar from '@components/sidebar/dynamic';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const gallopSidebar = (
  domNode: Element,
  options: HTMLReactParserOptions
) => {
  let header: React.ReactElement | null = null;
  let content: React.ReactElement | null = null;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group') && !header) {
          header = <>{domToReact(domNode.children as DOMNode[], options)}</>;
        } else if (hasExactClass(className, 'wp-block-group') && !content) {
          content = <>{domToReact(domNode.children as DOMNode[], options)}</>;
        }
        return <></>; //this prevents recursion
      }
    },
  };

  domToReact(domNode?.children as DOMNode[], op);

  return { header: header, content: content };
};

const SEOContent = ({ children }: { children: any }) => {
  return (
    <div className="absolute -left-[9999px] invisible h-0 w-0 overflow-hidden">
      {children}
    </div>
  );
};

export const GallopSidebar = ({
  header,
  content,
  className,
  sidebarHeader,
}: {
  header: any;
  content: any;
  className: any;
  sidebarHeader: any;
}) => {
  className = tailwindAlignClasses(className);
  return (
    <>
      <DynamicSidebar
        className={className}
        header={header}
        sidebarHeader={sidebarHeader}
      >
        {content}
      </DynamicSidebar>
      <SEOContent>{content}</SEOContent>
    </>
  );
};

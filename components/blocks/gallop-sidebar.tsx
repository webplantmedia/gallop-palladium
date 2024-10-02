'use server';

import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import React from 'react';
import DynamicSidebar from '@components/sidebar/dynamic';
import { BlockProps } from '@lib/types';

import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

interface GallopSidebarBlockProps extends BlockProps {
  sidebarHeader?: any;
}

export const GallopSidebar = ({
  node,
  className,
  options,
  sidebarHeader,
}: GallopSidebarBlockProps) => {
  let header: React.ReactElement | null = null;
  let content: React.ReactElement | null = null;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className: classes } = props;

        if (hasExactClass(classes, 'wp-block-group') && !header) {
          header = <>{domToReact(domNode.children as DOMNode[], options)}</>;
        } else if (hasExactClass(classes, 'wp-block-group') && !content) {
          content = <>{domToReact(domNode.children as DOMNode[], options)}</>;
        }
        return <></>; //this prevents recursion
      }
    },
  };

  domToReact(node?.children as DOMNode[], op);

  return (
    <DynamicSidebar
      className={className}
      header={header}
      sidebarHeader={sidebarHeader}
    >
      {content}
    </DynamicSidebar>
  );
};

'use client';

import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { getVarsFromNode } from '@utils/tools';
import CallToActionDropdown from './call-to-action-dropdown';

export default function CallToAction({ menu }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group')) {
          const data = getVarsFromNode(domNode);
          return <CallToActionDropdown data={data} />;
        }

        return <></>;
      }
    },
  };
  const html = parse(menu.postContent, options);

  return <>{html}</>;
}

'use client';

import MapOutlineIcon from '@iconify/icons-ion/map-outline';
import ClockIcon from '@iconify/icons-heroicons/clock';
import Iconify from '@components/iconify';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { getVarsFromHTML } from '@utils/tools';
import { replaceWordPressUrlRelative } from '@utils/tools';

export default function FooterColumns({ post }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group')) {
          if (domNode?.parent && 'attribs' in domNode.parent) {
            const parentProps: HTMLAttributeProps = castToHTMLAttributeProps(
              domNode.parent.attribs
            );

            let { className: parentClassName } = parentProps;

            if (
              parentClassName &&
              hasExactClass(parentClassName, 'wp-block-group')
            ) {
              return <p>Hey</p>;
            }
          }

          return (
            <div className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </div>
          );
        }
      }
    },
  };
  const html = parse(post.post_content, options);

  return <div className="px-6 pb-8 pt-8">{html}</div>;
}

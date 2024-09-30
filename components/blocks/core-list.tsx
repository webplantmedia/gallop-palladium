import Iconify from '@components/iconify';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import { Fragment } from 'react';
import classNames from 'classnames';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { BlockProps } from '@lib/types';
import { HTMLAttributeProps } from '@lib/types';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

export const CoreList = ({ node, className, props, options }: BlockProps) => {
  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const propsChild: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = propsChild;

        if (domNode.name === 'li') {
          return (
            <li className="flex gap-x-3 items-start">
              <span className="w-3 shrink-0 mt-[0.45rem]">
                <Iconify
                  className="text-primary-main dmh:text-modern-primary-main w-3 h-3"
                  icon={dotMarkIcon}
                />
              </span>
              <span className="">
                {domToReact(domNode.children as DOMNode[], options)}
              </span>
            </li>
          );
        }

        return <></>;
      }
    },
  };

  return (
    <ul
      role="list"
      className={classNames(
        className,
        'leading-normal mb-7 flex flex-col gap-2'
      )}
    >
      {domToReact(node.children as DOMNode[], op)}
    </ul>
  );
};

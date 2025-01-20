import Iconify from '@components/iconify';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import { castToHTMLAttributeProps, tailwindAlignClasses } from '@utils/tools';
import classNames from 'classnames';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { Alignment } from '@components/common';

export const coreList = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string,
  type: 'ul' | 'ol' // Restrict type to "ul" or "ol"
) => {
  const op: HTMLReactParserOptions = {
    replace(domNode, index) {
      if (domNode instanceof Element && domNode.attribs) {
        const props = castToHTMLAttributeProps(domNode.attribs);

        if (domNode.name === 'li') {
          return (
            <li className="flex gap-x-3 items-start">
              {type === 'ul' ? (
                <span className="w-3 shrink-0 mt-[0.45rem]">
                  <Iconify
                    className="text-primary-main dmh:text-modern-primary-main w-3 h-3"
                    icon={dotMarkIcon}
                  />
                </span>
              ) : (
                <span className="text-primary-main font-bold">
                  {index + 1}.
                </span>
              )}
              <span>{domToReact(domNode.children as DOMNode[], options)}</span>
            </li>
          );
        }

        return null;
      }
    },
  };

  const content = domToReact(domNode.children as DOMNode[], op);

  return <CoreList content={content} className={className} type={type} />;
};

export const CoreList = ({
  content,
  className,
  type,
}: {
  content: any;
  className: string;
  type: 'ul' | 'ol'; // Restrict type to "ul" or "ol"
}) => {
  className = tailwindAlignClasses(className);

  return (
    <Alignment
      as={type}
      className={classNames(
        className,
        'leading-normal mb-7 flex flex-col gap-2'
      )}
    >
      {content}
    </Alignment>
  );
};

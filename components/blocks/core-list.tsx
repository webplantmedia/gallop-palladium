import Iconify from '@components/iconify';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import {
  hasExactClass,
  castToHTMLAttributeProps,
  tailwindAlignClasses,
} from '@utils/tools';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { HTMLAttributeProps } from '@lib/types';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

export const coreList = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string
) => {
  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

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

  const content = domToReact(domNode.children as DOMNode[], op);

  return <CoreList content={content} className={className} />;
};

export const CoreList = ({
  content,
  className,
}: {
  content: any;
  className: string;
}) => {
  className = tailwindAlignClasses(className);

  return (
    <ul
      role="list"
      className={classNames(
        className,
        'leading-normal mb-7 flex flex-col gap-2'
      )}
    >
      {content}
    </ul>
  );
};

import {
  castToHTMLAttributeProps,
  getDomNodeText,
  extractMilestone,
} from '@utils/tools';
import { AnimatedNumber } from '@components/widgets/animated-number';
import classNames from 'classnames';
import { HTMLAttributeProps } from '@lib/types';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { gallopMilestone } from './gallop-milestone';

const getData = (domNode: Element) => {
  let index = -1;
  var length: number = domNode?.children.length ? domNode.children.length : 0;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        index++;
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (className?.includes('is-style-milestone')) {
          return gallopMilestone(
            domNode,
            classNames(
              className,
              index < 2
                ? 'border-b border-solid border-base-contrast pb-4'
                : '',
              index >= 2 && index < length - 1
                ? 'max-sm:border-b max-sm:border-solid max-sm:border-base-contrast pb-4'
                : ''
            )
          );
        }

        return <></>;
      }
    },
  };

  return <>{domToReact(domNode?.children as DOMNode[], op)}</>;
};

export const gallopMilestones = (
  domNode: Element,
  className: string | null = null
) => {
  const content = getData(domNode);

  return (
    <>
      <hr className="mt-6 border-t border-base-contrast" />
      <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {content}
      </dl>
    </>
  );
};

import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { getDOMNodeText } from '@utils/tools';
import classNames from 'classnames';
import PersonIcon from '@iconify/icons-carbon/person';
import DotMarkIcon from '@iconify/icons-carbon/dot-mark';
import Iconify from '@components/iconify';

export const GallopAccordionGroup = ({ node, props }) => {
  let icon = <></>;
  let heading = '';
  let paragraph = '';
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-code')) {
          const text = getDOMNodeText(domNode);
          if (text) {
            switch (text) {
              case 'icon-person':
                icon = (
                  <Iconify
                    icon={PersonIcon}
                    className="flex-shrink-0 h-6 w-6 mr-2"
                  />
                );
                break;
              case 'icon-dot':
                icon = (
                  <Iconify
                    icon={DotMarkIcon}
                    className="flex-shrink-0 h-6 w-6 mr-2"
                  />
                );
                break;
            }
          }
        } else if (hasExactClass(className, 'wp-block-heading')) {
          heading = getDOMNodeText(domNode);
        } else if (domNode.name === 'p') {
          paragraph = getDOMNodeText(domNode);
        }

        return <></>;
      }
    },
  };
  domToReact(node.children as DOMNode[], options);

  return (
    <>
      <div className={'mt-[2px] shrink-0'}>{icon}</div>
      <div className="w-full flex flex-col">
        <h3>{heading}</h3>
        <p className="text-base-contrast/50 text-sm italic">{paragraph}</p>
      </div>
    </>
  );
};

export const GallopAccordionItem = ({ node, props }) => {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group')) {
          return <GallopAccordionGroup node={domNode} props={props} />;
          // return domToReact(domNode.children as DOMNode[], options);
        }

        // return <></>;
      }
    },
  };

  return <>{domToReact(node.children as DOMNode[], options)}</>;
};

export const GallopAccordion = ({ node, props }) => {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group')) {
          return <GallopAccordionItem node={domNode} props={props} />;
        }

        // return <></>;
      }
    },
  };

  return <>{domToReact(node.children as DOMNode[], options)}</>;
};

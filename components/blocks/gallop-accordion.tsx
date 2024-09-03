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
import Link from 'next/link';
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

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
                    className="flex-shrink-0 h-5 w-5 text-primary-main"
                  />
                );
                break;
              case 'icon-dot':
                icon = (
                  <Iconify
                    icon={DotMarkIcon}
                    className="flex-shrink-0 h-3 w-3 text-primary-main"
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
    <div className="flex w-full items-start justify-between gap-4 py-2 text-left text-base-contrast text-sm">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row items-center">
          <div className="shrink-0 w-7">{icon}</div>
          <h3 className="text-base">{heading}</h3>
        </div>
        <p className="pl-7 text-base-contrast/50 text-sm italic">{paragraph}</p>
      </div>
    </div>
  );
};

export const GallopAccordionItem = ({ node, props }) => {
  let index = 0;
  let content: React.ReactElement[] = [];

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group')) {
          content.push(
            <GallopAccordionGroup
              key={`gallop-accordion-group-${index}`} // Use a unique key, like startIndex or a fallback
              node={domNode}
              props={props}
            />
          );
        }

        index++;

        return <></>;
      }
    },
  };
  domToReact(node.children as DOMNode[], options);

  if (content && content.length) {
    return <>{content}</>;
  }

  return null;
};

export const GallopAccordion = ({ node, props }) => {
  let heading: React.ReactElement | null = null;
  let content: React.ReactElement | null = null;

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (!heading && hasExactClass(className, 'wp-block-group')) {
          heading = <GallopAccordionGroup node={domNode} props={props} />;
        } else if (!content && hasExactClass(className, 'wp-block-group')) {
          content = <GallopAccordionItem node={domNode} props={props} />;
        }

        return <></>;
      }
    },
  };
  domToReact(node.children as DOMNode[], options);

  if (heading && content) {
    return (
      <Disclosure as="div" className="w-full">
        {({ open }) => (
          <>
            <DisclosureButton
              className={classNames(
                open ? '' : '',
                'flex w-full gap-4 items-start justify-between cursor-pointer py-2 text-left text-base-contrast'
              )}
            >
              {heading}
            </DisclosureButton>
            <DisclosurePanel className="text-base-contrast mb-4">
              {content}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    );
  }

  return <></>;
};

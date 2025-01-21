'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { getDomNodeText } from '@utils/tools';
import { Fragment } from 'react';
import React from 'react';

export const GallopSeeMore = ({ node, props }: any) => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!isOpen);
  };
  let { className } = props;

  let more = 'Read More';

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );

        if (domNode.name === 'a') {
          const { href } = props;
          if (href === '#') {
            more = getDomNodeText(domNode);
            return <></>;
          }

          return <>{domToReact(domNode.children as DOMNode[], options)}</>;
        }
      }
    },
  };
  const content = domToReact(node.children as DOMNode[], options);

  return (
    <p
      className={classNames(
        className,
        'leading-normal text-base mb-5 text-base-contrast'
      )}
    >
      <span
        className={classNames(
          !isOpen ? 'line-clamp-5 text-ellipsis' : '',
          'leading-normal'
        )}
      >
        {content}{' '}
      </span>
      <button
        onClick={handleOpen}
        className="inline cursor-pointer text-primary-main hover:text-primary-lighter pointer leading-normal font-bold"
      >
        {!isOpen ? more : more.replace('More', 'Less')}
      </button>
    </p>
  );
};

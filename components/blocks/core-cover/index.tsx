import {
  hasExactClass,
  castToHTMLAttributeProps,
  getVarsFromNode2,
} from '@utils/tools';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import {
  CoreCoverHero1,
  CoreCoverSection1,
  CoreCoverTestimonials1,
  CoreCoverBackground1,
  CoreCover,
  CoreCoverHeader1,
  CoreCoverCard1,
  CoreHeading,
  CoreParagraph,
} from '@components/blocks';
import { HeadingElements, ValidHeadingElements } from '@lib/types';

import { HTMLAttributeProps } from '@lib/types';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

const getData = (domNode: Element, options: HTMLReactParserOptions) => {
  let content: Array<React.ReactElement> = [];
  let imgProps: object | null = null;
  let backgroundImage: string | null = null;
  // let videoUrl: string | null = null;

  let index = 0;

  const op2: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;
        index++;

        if (className?.includes('wp-block-heading')) {
          if (ValidHeadingElements.includes(domNode.name as HeadingElements)) {
            content.push(
              <CoreHeading
                key={`heading-${index}`}
                tag={domNode.name as HeadingElements}
                className={classNames('text-white', className)}
                props={props}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </CoreHeading>
            );
          }
          return <></>;
        } else if (domNode.name === 'p') {
          content.push(
            <CoreParagraph
              key={`paragraph-${index}`}
              className={classNames('text-white', className)}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreParagraph>
          );
          return <></>;
        }

        content.push(
          <Fragment key={`content-${index}`}>
            {domToReact([domNode] as DOMNode[], options)}
          </Fragment>
        );
        return <></>;
      }
    },
  };

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-cover__image-background')) {
          if (props?.style?.backgroundImage) {
            backgroundImage = props.style.backgroundImage;
          } else if (props?.src) {
            imgProps = props;
          }
        } else if (
          hasExactClass(className, 'wp-block-cover__inner-container')
        ) {
          domToReact(domNode.children as DOMNode[], op2);
        }

        return <></>;
      }
    },
  };

  domToReact(domNode?.children as DOMNode[], op);

  return { imgProps, content, backgroundImage };
};

export const coreCover = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string
) => {
  if (className?.includes('is-style-hero-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverHero1 data={data} className={className} />;
  } else if (className?.includes('is-style-section-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverSection1 data={data} className={className} />;
  } else if (className?.includes('is-style-testimonials-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverTestimonials1 data={data} className={className} />;
  } else if (className?.includes('is-style-card-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverCard1 data={data} className={className} />;
  } else if (className?.includes('is-style-header-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreCoverHeader1 data={data} className={className} />;
  } else if (className?.includes('is-style-background-1')) {
    const data = getData(domNode, options);
    return <CoreCoverBackground1 data={data} className={className} />;
  }
  const data = getData(domNode, options);
  return <CoreCover data={data} className={className} />;
};

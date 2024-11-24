import classNames from 'classnames';
import {
  tailwindGetAlignClasses,
  castToHTMLAttributeProps,
} from '@utils/tools';
import { BlockProps } from '@lib/types';
import { HTMLAttributeProps } from '@lib/types';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { Fragment } from 'react';
import { ReactElement } from 'react';
import { Alignment, Container } from '@components/common';

const getData = (domNode: Element, options: HTMLReactParserOptions) => {
  let sticky: ReactElement = <></>;
  let content: Array<ReactElement> = [];

  let index = -1;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        index++;
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (className?.includes('is-style-content-sticky')) {
          sticky = <>{domToReact([domNode] as DOMNode[], options)}</>;
          content.push(
            <Fragment key={`content=${index}`}>
              <div className="block lg:hidden [&+*]:lg:!mt-0">
                {domToReact([domNode] as DOMNode[], options)}
              </div>
            </Fragment>
          );

          return <></>;
        }

        content.push(
          <Fragment key={`content=${index}`}>
            {domToReact([domNode] as DOMNode[], options)}
          </Fragment>
        );
        return <></>;
      }
    },
  };

  domToReact(domNode?.children as DOMNode[], op);

  return { sticky, content };
};

export const coreGroupContent1 = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string
) => {
  const data = getData(domNode, options);
  return <CoreGroupContent1 data={data} className={className} />;
};

export const CoreGroupContent1 = ({ data, className, props }: BlockProps) => {
  className = tailwindGetAlignClasses(className);
  const { sticky, content } = data;

  return (
    <Alignment align="full" className="relative">
      <Container width="wide" className="relative">
        <div className="flex gap-20 justify-start">
          <div className="w-4/12">{content}</div>
          <div className="w-3/12">
            <div className="sticky top-32 pb-32">{sticky}</div>
          </div>
        </div>
      </Container>
    </Alignment>
  );
};

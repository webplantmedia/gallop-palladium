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

const getData = (domNode: Element, options: HTMLReactParserOptions) => {
  let heading: Array<React.ReactElement> = [];
  let content: Array<React.ReactElement> = [];
  let imgs: Array<React.ReactElement> = [];

  let index = -1;
  let index2 = -1;

  const op2: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'img') {
          index2++;
          let { width, height } = props;

          if (width && height) {
            imgs.push(
              <div
                key={`img-${index2}`}
                className={classNames(
                  'aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10',
                  index2 % 2 === 1 ? '-mt-8 lg:-mt-32' : ''
                )}
              >
                <img
                  className={classNames(
                    props.className,
                    'block size-full object-cover'
                  )}
                  loading="lazy"
                  src={props.src}
                  style={props.style}
                  width={parseInt(props.width)}
                  height={parseInt(props.height)}
                  srcSet={props.srcSet}
                  sizes={props.sizes}
                  alt={props.alt}
                  title={props.title}
                />
              </div>
            );
          }
          return <></>;
        }
      }
    },
  };

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        index++;
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'h2') {
          heading.push(
            <Fragment key={`heading=${index}`}>
              {domToReact([domNode] as DOMNode[], options)}
            </Fragment>
          );
          return <></>;
        } else if (className?.includes('is-style-lead')) {
          heading.push(
            <Fragment key={`heading=${index}`}>
              {domToReact([domNode] as DOMNode[], options)}
            </Fragment>
          );
          return <></>;
        } else if (className?.includes('wp-block-gallery')) {
          domToReact(domNode.children as DOMNode[], op2);
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

  return { heading, content, imgs };
};

export const coreGroupSection1 = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string
) => {
  const data = getData(domNode, options);
  return <CoreGroupSection1 data={data} className={className} />;
};

export const CoreGroupSection1 = ({ data, className, props }: BlockProps) => {
  className = tailwindGetAlignClasses(className);
  const { heading, imgs, content } = data;

  return (
    <div className={classNames(className, 'overflow-hidden')}>
      {heading}
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="[&>p]:max-w-lg">{content}</div>

        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            {imgs}
          </div>
        </div>
      </section>
    </div>
  );
};

import classNames from 'classnames';
import { CoreQuote } from './core-quote';
import { domToReact, DOMNode } from 'html-react-parser';
import { toBase64, shimmer } from '@utils/shimmer';
// import Image from 'next/image';
import { Fragment } from 'react';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

const MediaTextBlock = ({ node, className, tag, options }) => {
  return (
    <div
      className={classNames(
        className,
        'grid grid-cols-1 md:grid-cols-2 gap-5 md-gap-10 items-start mb-20'
      )}
    >
      {node?.map((block: any, index: number) => {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          block.attribs
        );
        return (
          <Fragment key={'core-media-text-' + index}>
            {block.name == 'img' && (
              <div key={'core-media-text-img-' + index} className="">
                {domToReact(block?.children as DOMNode[], options)}
              </div>
            )}
            {block.name != 'img' && (
              <div
                key={'core-media-text-content-' + index}
                className="children-y-0"
              >
                {domToReact(block?.children as DOMNode[], options)}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

const HeroHomeBlock = ({ node, className, tag, options }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-[4fr_7fr] gap-10 !max-w-none mx-auto mb-24">
      {node?.map((block: any, index: number) => {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          block.attribs
        );
        if (block.name == 'figure') {
          return block?.children?.map((block2: any, index2: number) => {
            const props2: HTMLAttributeProps = castToHTMLAttributeProps(
              block2.attribs
            );
            return (
              block2.name == 'img' && (
                <div
                  key={'core-media-image-' + index2}
                  className="shrink -mt-12"
                >
                  {props2.width && props2.height && (
                    <img
                      className={classNames(
                        props2.className,
                        'w-full max-w-xs sm:max-w-none mx-auto border-x-[2px] border-b-[2px] border-white shadow-2xl'
                      )}
                      loading="lazy"
                      src={props2.src}
                      width={parseInt(props2.width)}
                      height={parseInt(props2.height)}
                      srcSet={props2.srcSet}
                      sizes={props2.sizes}
                      // placeholder={`data:image/svg+xml;base64,${toBase64(
                      // shimmer(Number(props.width), Number(props.height))
                      // )}`}
                      alt={props2.alt}
                      title={props2.title}
                      // quality={100}
                    />
                  )}
                </div>
              )
            );
          });
        }
        if (block.name == 'div') {
          return (
            <div key={'core-media-text-' + index} className="shrink-0">
              {block?.children?.map((block2: any, index2: number) => {
                const props2: HTMLAttributeProps = castToHTMLAttributeProps(
                  block2.attribs
                );
                if (block2.name == 'h1') {
                  return (
                    <h1
                      key={'core-media-text-h1-' + index2}
                      className="mb-8 text-3xl md:text-4xl lg:text-[2.9rem] xl:text-4xl 2xl:text-[2.9rem] text-white drop-shadow-md leading-tight xl:leading-tight 2xl:leading-tight small-caps"
                    >
                      {block2?.children?.map((block3: any, index3: number) => {
                        return (
                          <Fragment key={'core-media-text-h1-innner-' + index3}>
                            {block3.type == 'text' && block3.data}
                            {block3.name == 'em' && (
                              <span className="drop-shadow-sm">
                                <span className="text-xl md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-3xl">
                                  {block3.children[0]?.data}
                                </span>
                              </span>
                            )}
                            {block3.name == 'strong' && (
                              <span className="text-base-contrast">
                                {block3.children[0]?.data}
                              </span>
                            )}
                            {block3.name == 'mark' && (
                              <span className="text-primary-main">
                                {block3.children[0]?.data}
                              </span>
                            )}
                          </Fragment>
                        );
                      })}
                    </h1>
                  );
                }
                if (block2.name == 'blockquote') {
                  return (
                    <CoreQuote
                      key={'core-media-text-quote-' + index2}
                      tag={block2.name}
                      props={props2}
                      className={props2.className}
                      node={block2.children}
                      options={options}
                    />
                  );
                }
              })}
            </div>
          );
        }
      })}
    </section>
  );
};

export const CoreMediaText = ({ node, className, tag, options }) => {
  if (className.includes('hero-home')) {
    return (
      <HeroHomeBlock
        tag={tag}
        node={node}
        className={className}
        options={options}
      />
    );
  } else {
    return (
      <MediaTextBlock
        tag={tag}
        node={node}
        className={className}
        options={options}
      />
    );
  }
};

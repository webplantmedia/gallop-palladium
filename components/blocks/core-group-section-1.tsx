import classNames from 'classnames';
import {
  getVimeoIframeSrc,
  replaceWordPressUrlRelative,
  tailwindGetAlignClasses,
  hasClassName,
  castToHTMLAttributeProps,
} from '@utils/tools';
import { VideoPopup } from '@widgets/video-popup';
import { CoreParagraph, CoreHeading } from '@components/blocks';
import { BlockProps } from '@lib/types';
import { AnimatedNumber } from '@components/widgets/animated-number';
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

  /*const img1 = data?.wpBlockGallery?.wpBlockImage?.img || null;
  const img2 = data?.wpBlockGallery?.wpBlockImage_2?.img || null;
  const img3 = data?.wpBlockGallery?.wpBlockImage_3?.img || null;
  const img4 = data?.wpBlockGallery?.wpBlockImage_4?.img || null;
  const h3 = data?.h3 || null;
  const p = data?.p || null;
  const h3_2 = data?.h3_2 || null;
  const p_2 = data?.p_2 || null;
  const tbody = data?.wpBlockTable?.table?.tbody || null;
  const tr = tbody?.tr || null;
  const tr_2 = tbody?.tr_2 || null;
  const tr_3 = tbody?.tr_3 || null;
  const tr_4 = tbody?.tr_4 || null;

  return (
    <div className={classNames(className, '')}>
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          {h3 && (
            <h2 className="mb-1 leading-tight text-2xl md:text-3xl text-primary-main font-medium">
              {h3.jsx}
            </h2>
          )}
          {p && (
            <p className="mt-6 text-base-contrast mb-7 leading-normal">
              {p.jsx}
            </p>
          )}
          {p_2 && (
            <p className="mt-8 text-base-contrast mb-7 leading-normal">
              {p_2.jsx}
            </p>
          )}
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            {img1 && (
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                <img
                  className={classNames(
                    img1.className,
                    'block size-full object-cover'
                  )}
                  loading="lazy"
                  src={img1.src}
                  style={img1.style}
                  width={parseInt(img1.width)}
                  height={parseInt(img1.height)}
                  srcSet={img1.srcSet}
                  sizes={img1.sizes}
                  alt={img1.alt}
                  title={img1.title}
                />
              </div>
            )}
            {img2 && (
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                <img
                  className={classNames(
                    img2.className,
                    'block size-full object-cover'
                  )}
                  loading="lazy"
                  src={img2.src}
                  style={img2.style}
                  width={parseInt(img2.width)}
                  height={parseInt(img2.height)}
                  srcSet={img2.srcSet}
                  sizes={img2.sizes}
                  alt={img2.alt}
                  title={img2.title}
                />
              </div>
            )}
            {img3 && (
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                <img
                  className={classNames(
                    img3.className,
                    'block size-full object-cover'
                  )}
                  loading="lazy"
                  src={img3.src}
                  style={img3.style}
                  width={parseInt(img3.width)}
                  height={parseInt(img3.height)}
                  srcSet={img3.srcSet}
                  sizes={img3.sizes}
                  alt={img3.alt}
                  title={img3.title}
                />
              </div>
            )}
            {img4 && (
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                <img
                  className={classNames(
                    img4.className,
                    'block size-full object-cover'
                  )}
                  loading="lazy"
                  src={img4.src}
                  style={img4.style}
                  width={parseInt(img4.width)}
                  height={parseInt(img4.height)}
                  srcSet={img4.srcSet}
                  sizes={img4.sizes}
                  alt={img4.alt}
                  title={img4.title}
                />
              </div>
            )}
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          {h3_2 && (
            <h3 className="mb-1 leading-tight text-2xl md:text-3xl text-primary-main font-medium">
              {h3.jsx}
            </h3>
          )}
          <hr className="mt-6 border-t border-base-contrast" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {tr?.td && tr?.td_6 && (
              <div className="flex flex-col gap-y-2 border-b border-base-contrast pb-4">
                <dt className="text-sm/6 text-base-contrast">{tr.td_6.text}</dt>
                <dd className="order-first text-6xl font-medium tracking-tight">
                  <>
                    {tr.td.text}
                    <AnimatedNumber
                      start={tr.td_2.text}
                      end={tr.td_3.text}
                      decimals={tr.td_4 ? tr.td_4.text : 0}
                    />
                    {tr.td_5.text}
                  </>
                </dd>
              </div>
            )}
            {tr_2?.td && tr_2?.td_6 && (
              <div className="flex flex-col gap-y-2 border-b border-base-contrast pb-4">
                <dt className="text-sm/6 text-base-contrast">
                  {tr_2.td_6.text}
                </dt>
                <dd className="order-first text-6xl font-medium tracking-tight">
                  <>
                    {tr_2.td.text}
                    <AnimatedNumber
                      start={tr_2.td_2.text}
                      end={tr_2.td_3.text}
                      decimals={tr_2.td_4 ? tr_2.td_4.text : 0}
                    />
                    {tr_2.td_5.text}
                  </>
                </dd>
              </div>
            )}
            {tr_3?.td && tr_3?.td_6 && (
              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-base-contrast max-sm:pb-4">
                <dt className="text-sm/6 text-base-contrast">
                  {tr_3.td_6.text}
                </dt>
                <dd className="order-first text-6xl font-medium tracking-tight">
                  <>
                    {tr_3.td.text}
                    <AnimatedNumber
                      start={tr_3.td_2.text}
                      end={tr_3.td_3.text}
                      decimals={tr_3.td_4 ? tr_3.td_4.text : 0}
                    />
                    {tr_3.td_5.text}
                  </>
                </dd>
              </div>
            )}
            {tr_4?.td && tr_4?.td_6 && (
              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-base-contrast">
                  {tr_4.td_6.text}
                </dt>
                <dd className="order-first text-6xl font-medium tracking-tight">
                  <>
                    {tr_4.td.text}
                    <AnimatedNumber
                      start={tr_4.td_2.text}
                      end={tr_4.td_3.text}
                      decimals={tr_4.td_4 ? tr_4.td_4.text : 0}
                    />
                    {tr_4.td_5.text}
                  </>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </div>
	);*/
};

import { domToReact, DOMNode } from 'html-react-parser';
import Iconify from '../../components/iconify';
import QuoteIcon from '@iconify/icons-icon-park-outline/quote';
import { CoreParagraph } from './core-paragraph';
import { Fragment } from 'react';
import classNames from 'classnames';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import { BlockProps } from '@lib/types';

export const CoreQuote = ({ props, className, data }: BlockProps) => {
  /*if (className?.includes('is-style-plain')) {
    return (
      <blockquote
        className={classNames('flex flex-nowrap gap-2 mb-7', className)}
        id={props?.id ? props.id : undefined}
      >
        {node?.children?.map((block: any, index: number) => {
          const props: HTMLAttributeProps = castToHTMLAttributeProps(
            block.attribs
          );
          return (
            <Fragment key={'blockquote-' + index}>
              {block.name == 'p' && (
                <CoreParagraph
                  key={'blockquote-p' + index}
                  className="font-accent italic text-xl md:text-[1.6rem] md:leading-[1.4] leading-normal text-base-contrast2 mb-7"
                >
                  {domToReact(block?.children as DOMNode[], options)}
                </CoreParagraph>
              )}
              {block.name == 'cite' && (
                <cite
                  key={'blockquote-cite' + index}
                  className="block font-accent italic text-xl md:text-[1.6rem] md:leading-[1.4] leading-normal text-base-contrast2 mb-7 w-full text-right"
                >
                  {domToReact(block?.children as DOMNode[], options)}
                </cite>
              )}
            </Fragment>
          );
        })}
      </blockquote>
    );
	}*/

  const paragraphs = Array.isArray(data?.p) ? data.p : [data.p];

  return (
    <blockquote
      className={classNames(
        'relative mt-16 mb-14 flex flex-wrap gap-2 pl-[30px] sm:pl-[90px] pr-[20px] sm:pr-[40px]',
        className
      )}
      id={props?.id ? props.id : undefined}
    >
      <div className="relative">
        <div
          className="mr-0 pr-0 font-accent text-base-contrast/20 absolute leading-none -left-[30px] sm:-left-[90px] -top-[23px] sm:-top-[30px]"
          aria-hidden="true"
        >
          <Iconify className="w-16 h-16 sm:w-20 sm:h-20" icon={QuoteIcon} />
        </div>
        {paragraphs.map((block: any, index: number) => {
          return (
            <Fragment key={'blockquote-' + index}>
              {!('cite' in block) && (
                <CoreParagraph
                  key={'blockquote-p' + index}
                  className="font-accent italic text-xl md:text-[1.6rem] md:leading-[1.4] leading-normal text-base-contrast2 mb-7"
                >
                  {block.jsx}
                </CoreParagraph>
              )}
              {'cite' in block && (
                <cite
                  key={'blockquote-cite' + index}
                  className="block font-accent italic text-xl md:text-[1.6rem] md:leading-[1.4] leading-normal text-base-contrast2 mb-7 w-full text-right"
                >
                  {block.cite.jsx}
                </cite>
              )}
            </Fragment>
          );
        })}
      </div>
    </blockquote>
  );
};

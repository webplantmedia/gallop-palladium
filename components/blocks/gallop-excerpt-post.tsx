import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import Link from 'next/link';
import {
  CoreHeading,
  CoreParagraph,
  TagAnchor,
  CoreImage,
} from '@components/blocks';
import { replaceWordPressUrlRelative } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const GallopExcerptPost = ({ node, className, id, props, options }) => {
  let heading: any;
  let paragraph: any;
  let figure: any;
  let href = '';
  let hasTextLink = false;

  node.map((block: any, index: number) => {
    const props: HTMLAttributeProps = castToHTMLAttributeProps(block.attribs);
    const { className } = props;
    if (block.name === 'a' && block.children) {
      ({ href } = props);
      href = replaceWordPressUrlRelative(href);
      block.children.map((el: any, index2: number) => {
        if (el.name == 'figure') {
          figure = (
            <CoreImage
              tag={el.name}
              className={classNames(className, '!mb-0 [&_img]:!rounded-none')}
              node={el}
              options={options}
            />
          );
        }
      });
    } else if (className?.includes('wp-block-heading')) {
      heading = (
        <CoreHeading
          tag={block.name}
          className={classNames(className, 'p-4 !mb-0 !mt-0')}
          props={props}
        >
          {domToReact(block.children as DOMNode[], options)}
        </CoreHeading>
      );
    } else if (block.name == 'p') {
      block?.children?.map((c: any) => {
        if (c.type == 'tag' && c.name == 'a') {
          hasTextLink = true;
        }
      });
      paragraph = (
        <CoreParagraph className={classNames(className, 'p-4')}>
          {domToReact(block.children as DOMNode[], options)}
        </CoreParagraph>
      );
    }
  });

  return (
    <div className={classNames(className, '')}>
      <div
        className={classNames(
          'block bg-white/10 rounded-sm hover:bg-white/30 shadow-lg [&_p]:mb-0',
          false &&
            '[&_img]:object-center [&_img]:object-cover [&_img]:aspect-4/3'
        )}
      >
        <Link prefetch={false} id={id} href={href} className="block">
          {heading && heading}
          {figure && figure}
          {!hasTextLink && paragraph && paragraph}
        </Link>
        {hasTextLink && paragraph && paragraph}
      </div>
    </div>
  );
};

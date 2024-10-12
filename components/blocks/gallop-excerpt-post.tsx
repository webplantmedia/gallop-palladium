import classNames from 'classnames';
import Link from 'next/link';
import {
  CoreHeading,
  CoreParagraph,
  TagAnchor,
  CoreImage,
} from '@components/blocks';
import { replaceWordPressUrlRelative } from '@utils/tools';
import { BlockProps } from '@lib/types';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

export const GallopExcerptPost = ({
  node,
  className: classes,
  props,
  options,
}: BlockProps) => {
  let heading: any;
  let paragraph: React.ReactElement | null = null;
  let figure: any;
  let href = '';
  let hasTextLink = false;

  const { id } = props || {};

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        const { className } = props;
        if (domNode.name === 'a') {
          const parent = (domNode?.parent as Element)?.name;
          if (parent === 'p') {
            hasTextLink = true;
          } else {
            ({ href } = props);
            href = replaceWordPressUrlRelative(href);
          }
        } else if (className?.includes('wp-block-image')) {
          figure = (
            <CoreImage
              className={classNames(className, '!mb-0 [&_img]:!rounded-none')}
              node={domNode}
              options={options}
            />
          );
          return <></>;
        } else if (className?.includes('wp-block-heading')) {
          heading = (
            <CoreHeading
              tag={domNode.name}
              className={classNames(className, 'p-4 !mb-0 !mt-0')}
              props={props}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreHeading>
          );
          return <></>;
        } else if (domNode.name == 'p') {
          if (domNode?.children?.length > 0) {
            const p = domToReact(domNode.children as DOMNode[], options);
            if (p) {
              paragraph = (
                <CoreParagraph className={classNames(className, 'p-4')}>
                  {p}
                </CoreParagraph>
              );
            }
          }
          return <></>;
        }
      }
    },
  };

  domToReact(node?.children as DOMNode[], op);
  let content = (
    <Link prefetch={false} id={id} href={href} className="block">
      {heading && heading}
      {figure && figure}
      {!hasTextLink && paragraph && paragraph}
    </Link>
  );

  if (!href || href === '#') {
    content = (
      <div id={id} className="block">
        {heading && heading}
        {figure && figure}
        {!hasTextLink && paragraph && paragraph}
      </div>
    );
  }

  return (
    <div className={classNames(classes, 'mb-14')}>
      <div
        className={classNames(
          'block bg-base-card rounded-sm hover:bg-base-card/70 shadow-lg [&_p]:mb-0',
          false &&
            '[&_img]:object-center [&_img]:object-cover [&_img]:aspect-4/3'
        )}
      >
        {content}
        {hasTextLink && paragraph && paragraph}
      </div>
    </div>
  );
};

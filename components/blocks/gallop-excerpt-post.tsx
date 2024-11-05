import classNames from 'classnames';
import Link from 'next/link';
import {
  CoreHeading,
  CoreParagraph,
  TagAnchor,
  CoreImage,
} from '@components/blocks';
import { replaceWordPressUrlRelative, getVarsFromNode } from '@utils/tools';
import { BlockProps } from '@lib/types';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

export const gallopExcerptPost = (
  domNode: Element,
  options: HTMLReactParserOptions
) => {
  let heading: any;
  let paragraph: React.ReactElement | null = null;
  let figure: any;
  let href = '';
  let hasTextLink = false;

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
          const data = getVarsFromNode(domNode);
          figure = (
            <CoreImage
              className={classNames(className, '!mb-0 [&_img]:!rounded-none')}
              data={data}
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
            const p = domToReact(domNode.children as DOMNode[], op);
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

  domToReact(domNode?.children as DOMNode[], op);

  return {
    heading: heading,
    paragraph: paragraph,
    figure: figure,
    href: href,
    hasTextLink: hasTextLink,
  };
};

export const GallopExcerptPost = ({
  className,
  heading,
  paragraph,
  figure,
  href,
  hasTextLink,
  id,
}: {
  className: string;
  heading: React.ReactElement | null;
  paragraph: React.ReactElement | null;
  figure: any;
  href: string;
  hasTextLink: boolean;
  id: string;
}) => {
  let content = (
    <Link prefetch={true} id={id} href={href} className="block">
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
    <div className={classNames(className, 'mb-14')}>
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

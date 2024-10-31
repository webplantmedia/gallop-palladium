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

import classNames from 'classnames';
import { replaceWordPressUrlRelative } from '@utils/tools';
import { domToReact, DOMNode } from 'html-react-parser';
import Link from 'next/link';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import { BlockProps } from '@lib/types';

export const TagAnchor = ({ children, className, props }: BlockProps) => {
  className = className ? className : '';
  let href = '#';
  if (props?.href) {
    href = replaceWordPressUrlRelative(props.href);
  }

  // const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  // let linkClass = '';

  // let linkClass =
  // 'text-secondary-main underline underline-offset-2 hover:text-secondary-lighter';

  // if (className?.includes('heading-link')) {
  // linkClass = '';
  // }

  return (
    <Link
      scroll={true}
      prefetch={false}
      className={classNames(className, '')}
      href={href}
    >
      {children}
    </Link>
  );
};

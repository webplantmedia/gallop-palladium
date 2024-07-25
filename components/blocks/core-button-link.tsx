import { domToReact, DOMNode } from 'html-react-parser';
import { replaceWordPressUrlRelative } from '@utils/tools';
import classNames from 'classnames';
import Link from 'next/link';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const CoreButtonLink = ({ node, children, tag, className }) => {
  className = className ? className : '';
  const props: HTMLAttributeProps = castToHTMLAttributeProps(node.attribs);

  if (className.includes('is-style-large')) {
    className = className.replace('is-style-large', 'text-base py-4 px-6');
  } else {
    className += ' text-base py-3 px-5';
  }

  return (
    <Link
      prefetch={false}
      className={classNames(className, 'w-full')}
      href={props?.href ? replaceWordPressUrlRelative(props.href) : '#'}
    >
      {children}
    </Link>
  );
};

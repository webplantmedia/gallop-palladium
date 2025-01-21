import { BlockProps } from '@lib/types';
import { replaceWordPressUrlRelative } from '@utils/tools';
import classNames from 'classnames';
import Link from 'next/link';

export const CoreButtonLink = ({ children, className, props }: BlockProps) => {
  className = className ? className : '';
  const href = props?.href;

  if (className.includes('is-style-large')) {
    className = className.replace('is-style-large', 'text-base py-4 px-6');
  } else {
    className += ' text-base py-3 px-5';
  }

  if (!href || href === '#') {
    return (
      <div className={classNames(className, 'w-full cursor-pointer')}>
        {children}
      </div>
    );
  }

  return (
    <Link
      scroll={true}
      prefetch={true}
      className={classNames(className, 'w-full')}
      href={href ? replaceWordPressUrlRelative(href) : '#'}
    >
      {children}
    </Link>
  );
};

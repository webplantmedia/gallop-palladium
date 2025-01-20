import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';
import Link from 'next/link';

export const Button = ({
  as,
  children,
  className,
  href,
}: {
  as?: string;
  children: ReactNode;
  className?: string;
  href?: string | undefined;
}) => {
  let buttonClass: string =
    'border-2 inline-flex items-center border-accent bg-accent text-white hover:bg-primary-light hover:border-primary-light rounded-md px-4 py-2 text-base font-normal shadow-sm';

  if (as) {
    switch (as) {
      case 'primary':
        break;
      case 'secondary':
        break;
      case 'outline':
        buttonClass =
          'border-2 inline-flex items-center border-accent bg-transparent text-accent hover:bg-accent/10 hover:border-accent-light rounded-md px-4 py-2 text-base font-normal shadow-sm';
        break;
      case 'text':
        buttonClass =
          'text-base font-bold text-primary-main hover:text-primary-light';
        break;
    }
  }
  return href ? (
    <Link
      prefetch={true}
      scroll={false}
      href={href}
      className={classNames(buttonClass, className)}
    >
      {children}
    </Link>
  ) : (
    <span className={classNames(buttonClass, className)}>{children}</span>
  );
};

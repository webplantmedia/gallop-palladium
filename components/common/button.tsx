import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';

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
    'border-2 overflow-hidden inline-flex items-center border-accent bg-accent text-white hover:bg-primary-light hover:border-primary-light rounded-md px-4 py-2 text-base font-normal shadow-sm';

  if (as) {
    switch (as) {
      case 'primary':
        break;
      case 'secondary':
        break;
      case 'text':
        buttonClass =
          'text-base font-bold text-primary-main hover:text-primary-light';
        break;
    }
  }
  return (
    <a href={href} className={classNames(buttonClass, className)}>
      {children}
    </a>
  );
};

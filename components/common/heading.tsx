import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';

export const Heading = ({
  as: Component = 'h2',
  inStyle,
  children,
  className,
}: {
  as?: ElementType;
  inStyle?: string;
  children: ReactNode;
  className?: string;
}) => {
  let headingClass: string = '';

  if (!inStyle) {
    inStyle = String(Component);
  }

  switch (inStyle) {
    case 'h1':
      headingClass =
        '!leading-tight text-5xl md:text-6xl lg:text-6xl 3xl:text-7xl text-contrast font-bold mb-7';
      break;
    case 'h2':
      headingClass =
        '!leading-tight text-4xl md:text-5xl lg:text-6xl text-contrast mt-14 font-bold mb-7';
      break;
    case 'h3':
      headingClass =
        '!leading-tight text-2xl md:text-3xl text-primary-main font-medium mb-2';
      break;
    case 'h4':
      headingClass =
        '!leading-tight text-2xl text-contrast font-medium text-base mb-7';
      break;
    case 'h5':
      headingClass = '!leading-tight mb-7';
      break;
    case 'h6':
      headingClass = '!leading-tight mb-7';
      break;
  }
  return (
    <Component className={classNames(headingClass, className)}>
      {children}
    </Component>
  );
};

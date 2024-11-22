import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';

export const Heading = ({
  as: Component = 'h2',
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className: string;
}) => {
  let headingClass: string =
    '!leading-tight text-4xl md:text-5xl lg:text-6xl text-contrast mt-14 font-bold mb-7';

  switch (as) {
    case 'h1':
      headingClass =
        '!leading-tight text-5xl md:text-6xl lg:text-6xl 3xl:text-7xl text-contrast font-bold mb-7';
      break;
  }
  return (
    <Component className={classNames(headingClass, className)}>
      {children}
    </Component>
  );
};

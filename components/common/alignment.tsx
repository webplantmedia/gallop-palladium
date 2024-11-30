import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';
import { getAlign } from '@utils/tools';

export const Container = ({
  as: Component = 'div',
  width = 'wide',
  children,
  className,
}: {
  as?: ElementType;
  width?: string;
  children: ReactNode;
  className?: string;
}) => {
  let containerClass = 'max-w-3xl px-4 sm:px-8 mx-auto';

  switch (width) {
    case 'wide':
      containerClass = 'max-w-screen-3xl px-4 sm:px-8 mx-auto';
      break;
    case 'content':
      break;
  }

  return (
    <Component className={classNames(containerClass, className)}>
      {children}
    </Component>
  );
};

export const Alignment = ({
  as: Component = 'div',
  align = 'none',
  children,
  className,
}: {
  as?: ElementType;
  align?: string;
  children: ReactNode;
  className?: string;
}) => {
  const { alignment } = getAlign(`align${align}`, 'content');

  return (
    <Component className={classNames(alignment, className)}>
      {children}
    </Component>
  );
};

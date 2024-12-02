import classNames from 'classnames';
import { ReactNode } from 'react';
import { getAlign } from '@utils/tools';

export const Container = ({
  as: Component = 'div',
  width = 'wide',
  children,
  className,
  id, // Add the id prop
}: {
  as?: keyof JSX.IntrinsicElements;
  width?: string;
  children: ReactNode;
  className?: string;
  id?: string; // Make id optional
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
    <Component id={id} className={classNames(containerClass, className)}>
      {children}
    </Component>
  );
};

export const Alignment = ({
  as: Component = 'div',
  align = 'none',
  defaultAlign = 'content',
  children,
  className,
  id, // Add the id prop
}: {
  as?: keyof JSX.IntrinsicElements;
  align?: string;
  defaultAlign?: string;
  children: ReactNode;
  className?: string;
  id?: string; // Make id optional
}) => {
  const { alignment } = getAlign(`align${align}`, defaultAlign);

  return (
    <Component id={id} className={classNames(alignment, className)}>
      {children}
    </Component>
  );
};

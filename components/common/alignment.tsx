import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';

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
  let alignmentClass: string = '';

  if (align) {
    switch (align) {
      case 'full':
        alignmentClass = 'mx-auto max-w-screen-4xl clear-both';
        break;
      case 'wide':
        alignmentClass = 'mx-auto max-w-screen-3xl clear-both px-4 sm:px-8';
        break;
      case 'left':
        alignmentClass =
          'text-center md:float-left md:mr-10 md:mb-10 ml-0 mr-0 px-4 sm:px-8';
        break;
      case 'right':
        alignmentClass =
          'text-center md:float-right md:ml-10 md:mb-10 ml-0 mr-0 px-4 sm:px-8';
        break;
      case 'center':
        alignmentClass =
          'text-center mx-auto justify-center ml-0 mr-0 px-4 sm:px-8';
        break;
      case 'none':
        alignmentClass = 'px-4 sm:px-8';
        break;
    }
  }

  return (
    <Component className={classNames(alignmentClass, className)}>
      {children}
    </Component>
  );
};

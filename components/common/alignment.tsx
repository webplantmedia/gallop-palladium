import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';

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
        alignmentClass = 'mx-auto !max-w-screen-4xl clear-both !px-0';
        break;
      case 'wide':
        alignmentClass = 'mx-auto !max-w-screen-3xl clear-both';
        break;
      case 'left':
        alignmentClass =
          'text-center md:float-left md:mr-10 md:mb-10 ml-0 mr-0';
        break;
      case 'right':
        alignmentClass =
          'text-center md:float-right md:ml-10 md:mb-10 ml-0 mr-0';
        break;
      case 'center':
        alignmentClass = 'text-center mx-auto justify-center ml-0 mr-0';
        break;
      case 'none':
        alignmentClass = '';
        break;
    }
  }

  return (
    <Component className={classNames(alignmentClass, className)}>
      {children}
    </Component>
  );
};

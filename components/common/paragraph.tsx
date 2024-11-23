import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';

export const Paragraph = ({
  as,
  children,
  className,
}: {
  as?: string;
  children: ReactNode;
  className?: string;
}) => {
  let paragraphClass: string = 'text-contrast mb-7 leading-normal';
  let innerClass: string =
    '[&>a]:!text-accent [&>a]:hover:!text-accent-light [&>a]:!no-underline';

  if (as) {
    switch (as) {
      case 'small':
        break;
      case 'large':
        break;
      case 'subtle':
        break;
      case 'leader':
        paragraphClass =
          'text-xl sm:text-2xl lg:text-3xl mb-14 !leading-relaxed';
        break;
    }
  }
  return (
    <p className={classNames(paragraphClass, className, innerClass)}>
      {children}
    </p>
  );
};

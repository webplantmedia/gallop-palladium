import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';

export const AccentHeading = ({
  as: Component = 'h2',
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className: string;
}) => {
  return (
    <Component
      className={classNames(
        '!leading-tight text-xl uppercase tracking-[0.1em] text-primary-main mb-7 font-accent font-normal flex items-center [&+h3]:!mt-0',
        className
      )}
    >
      {children}
    </Component>
  );
};

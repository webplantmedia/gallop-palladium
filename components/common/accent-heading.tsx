import classNames from 'classnames';
import { ReactNode, ElementType } from 'react';
import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';

export const AccentHeading = ({
  as: Component = 'h2',
  children,
  className,
  icon = true,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  icon?: boolean;
}) => {
  return (
    <Component
      className={classNames(
        '!leading-tight text-xl uppercase tracking-[0.1em] text-primary-main mb-7 font-accent font-normal flex items-center [&+h3]:!mt-0',
        className
      )}
    >
      {children}
      {icon && (
        <Iconify
          icon={ArrowInsertIcon}
          className="flex-shrink-0 h-auto w-7 rotate-180"
        />
      )}
    </Component>
  );
};

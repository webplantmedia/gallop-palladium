import classNames from 'classnames';
import { BlockProps } from '@lib/types';

export const CoreGroup = ({ className, props, children }: BlockProps) => {
  const { id } = props || {};

  return (
    <div
      id={id}
      className={classNames(
        className,
        'mb-10 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>*>*:first-child]:mt-0 [&>*>*:last-child]:mb-0'
      )}
    >
      {children}
    </div>
  );
};

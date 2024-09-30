import classNames from 'classnames';
import { BlockProps } from '@lib/types';

export const CoreParagraph = ({ className = '', children }: BlockProps) => {
  if (className) {
    className = className.replace(
      'has-x-large-font-size',
      'has-x-large-font-size text-xl sm:text-2xl lg:text-3xl mt-14 !mb-14'
    );
    className = className.replace(
      'has-large-font-size',
      'has-large-font-size text-xl sm:text-2xl lg:text-2xl mt-14 !mb-14'
    );
  }

  return (
    <p
      className={classNames(
        className,
        'text-base-contrast mb-7 leading-normal'
      )}
    >
      {children}
    </p>
  );
};

import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { tailwindAlignClasses } from '@utils/tools';

export const CoreParagraph = ({ className = '', children }: BlockProps) => {
  className = tailwindAlignClasses(className);

  if (className.includes('is-style-lead')) {
    return (
      <p
        className={classNames(
          className,
          'has-x-large-font-size text-xl sm:text-2xl lg:text-3xl mb-14 !leading-relaxed'
        )}
      >
        <span className="max-w-3xl block">{children}</span>
      </p>
    );
  }

  if (className) {
    className = className.replace(
      'has-x-large-font-size',
      'has-x-large-font-size text-xl sm:text-2xl lg:text-3xl mt-14 !mb-14 !leading-relaxed'
    );
    className = className.replace(
      'has-large-font-size',
      'has-large-font-size text-xl sm:text-2xl lg:text-2xl mt-14 !mb-14 !leading-relaxed'
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

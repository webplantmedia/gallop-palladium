import classNames from 'classnames';
import { BlockProps } from '@lib/types';

export const CoreButton = ({
  children,
  options,
  className = '',
}: BlockProps) => {
  className = className.replace(
    'wp-block-button__width-100',
    'w-full basis-full'
  );
  className = className.replace(
    'wp-block-button__width-75',
    'w-full basis-full xl:w-[calc(75%_-_0.25rem)] xl:basis-[calc(75%_-_0.25rem)]'
  );
  className = className.replace(
    'wp-block-button__width-50',
    'w-full basis-full xl:w-[calc(50%_-_0.25rem)] xl:basis-[calc(50%_-_0.25rem)]'
  );
  className = className.replace(
    'wp-block-button__width-25',
    'w-full basis-full xl:w-[calc(25%_-_0.25rem)] xl:basis-[calc(25%_-_0.25rem)]'
  );

  if (className.includes('is-style-second-outline')) {
    className = className.replace(
      'is-style-second-outline',
      'border-2 border-primary-main text-primary-main bg-transparent hover:bg-white/30'
    );
  } else if (className.includes('is-style-second')) {
    className = className.replace(
      'is-style-second',
      'bg-secondary-main text-secondary-contrast hover:bg-secondary-light'
    );
  } else if (className.includes('is-style-outline')) {
    className = className.replace(
      'is-style-outline',
      'border-2 border-secondary-main text-secondary-main bg-transparent hover:bg-white/30'
    );
  } else {
    className +=
      ' bg-primary-main text-primary-contrast hover:bg-primary-light';
  }

  return (
    <div
      className={classNames(
        className,
        'text-center rounded-md shadow-sm flex items-center justify-center'
      )}
    >
      {children}
    </div>
  );
};

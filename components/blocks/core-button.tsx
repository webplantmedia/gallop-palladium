import classNames from 'classnames';

export const CoreButton = ({ children, className = '' }) => {
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
      'border-2 border-primary-main text-primary-main bg-transparent hover:bg-white/30 dmh:border-modern-secondary-main dmh:hover:border-modern-secondary-light dmh:text-modern-secondary-main dmh:hover:text-modern-secondary-light dmh:hover:bg-modern-secondary-main/10'
    );
  } else if (className.includes('is-style-second')) {
    className = className.replace(
      'is-style-second',
      'bg-secondary-main text-secondary-contrast hover:bg-secondary-light dmh:bg-modern-secondary-main dmh:hover:bg-modern-secondary-light'
    );
  } else if (className.includes('is-style-outline')) {
    className = className.replace(
      'is-style-outline',
      'border-2 border-secondary-main text-secondary-main bg-transparent hover:bg-white/30 dmh:border-modern-primary-main dmh:hover:border-modern-primary-light dmh:text-modern-primary-main dmh:hover:text-modern-primary-light dmh:hover:bg-modern-primary-main/10'
    );
  } else {
    className +=
      ' bg-secondary-main text-secondary-contrast hover:bg-secondary-light dmh:bg-modern-primary-main dmh:hover:bg-modern-primary-light';
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

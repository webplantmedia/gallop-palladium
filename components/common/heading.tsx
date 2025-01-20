import classNames from 'classnames';
import { ReactNode } from 'react';
import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import { HeadingElements, HeadingAccentElements } from '@lib/types';

type HeadingProps = {
  as?: HeadingElements;
  inStyle?: HeadingElements;
  outline?: boolean;
  children: ReactNode;
  id?: string;
  className?: string;
};

export const Heading = ({
  as: Component = 'h2',
  inStyle,
  outline = false,
  children,
  id,
  className,
}: HeadingProps) => {
  let headingClass = '';

  if (!inStyle) {
    inStyle = Component;
  }

  switch (inStyle) {
    case 'h1':
      headingClass =
        '!leading-tight text-5xl md:text-6xl lg:text-6xl 3xl:text-7xl text-contrast font-bold mb-7';
      break;
    case 'h2':
      headingClass =
        '!leading-tight text-4xl md:text-5xl lg:text-6xl text-contrast mt-14 font-bold mb-7';
      break;
    case 'h3':
      headingClass =
        '!leading-tight text-2xl md:text-3xl text-primary-main font-medium mb-2';
      break;
    case 'h4':
      headingClass = '!leading-tight text-2xl text-contrast font-medium mb-7';
      break;
    case 'h5':
      headingClass = '!leading-tight mb-7';
      break;
    case 'h6':
      headingClass = '!leading-tight mb-7';
      break;
  }

  if (outline) {
    headingClass += ' text-stroke text-stroke-white';
  }

  return (
    <Component id={id} className={classNames(headingClass, className)}>
      {children}
    </Component>
  );
};

type HeadingAccentProps = {
  as?: HeadingAccentElements;
  children: ReactNode;
  size?: 'large' | 'small' | 'default';
  id?: string;
  className?: string;
  icon?: boolean;
};

export const HeadingAccent = ({
  as: Component = 'h2',
  children,
  size = 'default',
  id,
  className,
  icon = true,
}: HeadingAccentProps) => {
  let sizeClass = '';

  if (size === 'large') {
    sizeClass = 'text-2xl tracking-[0.3em]';
  } else if (size === 'small') {
    sizeClass = 'text-sm tracking-[0.1em]';
  }

  return (
    <Component
      id={id}
      className={classNames(
        '!leading-tight text-xl uppercase tracking-[0.1em] text-primary-main mb-7 font-accent font-normal flex items-center [&+h2]:!mt-0 [&+h3]:!mt-0',
        className,
        sizeClass
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

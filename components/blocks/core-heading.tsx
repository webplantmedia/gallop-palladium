import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { ElementType } from 'react';
import { tailwindAlignClasses } from '@utils/tools';

export const CoreHeading = ({
  children,
  tag = 'h2',
  className = '',
  props,
}: BlockProps) => {
  className = tailwindAlignClasses(className);

  const { id } = props ?? {};
  const Tag: ElementType = tag as ElementType;

  let headingClass = {
    h1: 'gallop-h1',
    h2: 'gallop-h2',
    h3: 'gallop-h3',
    h4: 'gallop-h4',
    h5: 'gallop-h5',
    h6: 'gallop-h6',
  };

  let hClass = '';

  if (className?.includes('is-style-accent-title')) {
    let accentClass = 'gallop-accent-heading';

    className = className.replace('text-center', 'justify-center');
    className = className.replace('text-left', 'justify-start');
    className = className.replace('text-right', 'justify-end');

    return (
      <Tag key={id} id={id} className={classNames(accentClass, className)}>
        {children}
        <Iconify
          icon={ArrowInsertIcon}
          className="flex-shrink-0 h-auto w-7 rotate-180"
        />
      </Tag>
    );
  } else if (className?.includes('is-style-quote-title')) {
    let quoteClass =
      'leading-tight text-3xl md:text-4xl lg:text-5xl text-base-contrast small-caps text-right text-base-contrast mb-7 dmh:xl:text-4xl dmh:text-3xl pl-8 md:pl-20';
    return (
      <Tag key={id} id={id} className={classNames(quoteClass, className)}>
        {children}
      </Tag>
    );
  }

  if (className?.includes('is-style-h1')) {
    hClass = headingClass['h1'];
  }
  if (className?.includes('is-style-h2')) {
    hClass = headingClass['h2'];
  }
  if (className?.includes('is-style-h3')) {
    hClass = headingClass['h3'];
  }

  return (
    <Tag
      key={id}
      id={id}
      className={classNames(
        className,
        hClass || headingClass[tag as keyof typeof headingClass],
        className
      )}
    >
      {children}
    </Tag>
  );
};

import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { ElementType } from 'react';
import { getAlign } from '@utils/tools';
import { Heading, HeadingAccent } from '@components/common';

export const CoreHeading = ({
  children,
  tag = 'h2',
  className = '',
  props,
}: BlockProps) => {
  let inStyle = tag;

  const { id } = props ?? {};
  let Tag: ElementType = tag as ElementType;

  const { align, justify } = getAlign(className);

  if (className?.includes('is-style-accent-title')) {
    return (
      <HeadingAccent
        key={id}
        id={id}
        align={align}
        className={classNames(className)}
      >
        {children}
        <Iconify
          icon={ArrowInsertIcon}
          className="flex-shrink-0 h-auto w-7 rotate-180"
        />
      </HeadingAccent>
    );
  }

  if (className?.includes('is-style-h1')) {
    inStyle = 'h1';
  }
  if (className?.includes('is-style-h2')) {
    inStyle = 'h2';
  }
  if (className?.includes('is-style-h3')) {
    inStyle = 'h3';
  }

  let alignmentClass = 'max-w-3xl px-4 sm:px-8 mx-auto';

  switch (align) {
    case 'wide':
      alignmentClass = 'max-w-screen-3xl px-4 sm:px-8 mx-auto';
      break;
    case 'none':
      alignmentClass = '';
      break;
  }

  return (
    <Heading
      key={id}
      id={id}
      align={align}
      inStyle={inStyle}
      className={classNames(className, alignmentClass)}
    >
      {children}
    </Heading>
  );
};

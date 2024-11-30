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

  const { alignment, justify, textAlign } = getAlign(className);

  if (className?.includes('is-style-accent-title')) {
    return (
      <HeadingAccent
        as={Tag}
        key={id}
        id={id}
        className={classNames(className, alignment, justify)}
      >
        {children}
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

  return (
    <Heading
      as={Tag}
      key={id}
      id={id}
      inStyle={inStyle}
      className={classNames(className, alignment, textAlign)}
    >
      {children}
    </Heading>
  );
};

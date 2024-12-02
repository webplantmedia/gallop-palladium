import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { getAlign } from '@utils/tools';
import { Heading, HeadingAccent } from '@components/common';

export const CoreHeading = ({
  children,
  tag = 'h2',
  className = '',
  props,
  parentTag = undefined,
}: BlockProps) => {
  let inStyle = tag;

  const { id } = props ?? {};
  let Tag: keyof JSX.IntrinsicElements = tag as keyof JSX.IntrinsicElements;

  const defaultAlign = parentTag ? 'none' : 'content';
  const { alignment, justify, textAlign } = getAlign(className, defaultAlign);

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

import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { getAlign } from '@utils/tools';
import { Heading, HeadingAccent } from '@components/common';
import { HeadingElements } from '@lib/types';

type CoreHeadingProps = BlockProps & {
  tag?: HeadingElements;
  parentTag?: string;
};

export const CoreHeading = ({
  children,
  tag = 'h2',
  className = '',
  props,
  parentTag = undefined,
}: CoreHeadingProps) => {
  let inStyle = tag;

  const { id } = props ?? {};
  const defaultAlign = parentTag ? 'none' : 'content';
  const { alignment, justify, textAlign } = getAlign(className, defaultAlign);

  if (className?.includes('is-style-accent-title')) {
    return (
      <HeadingAccent
        as={tag}
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
      as={tag}
      key={id}
      id={id}
      inStyle={inStyle}
      className={classNames(className, alignment, textAlign)}
    >
      {children}
    </Heading>
  );
};

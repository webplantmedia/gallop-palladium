import { BlockProps } from '@lib/types';
import { Paragraph } from '@components/common';
import { getAlign } from '@utils/tools';
import classNames from 'classnames';

export const CoreParagraph = ({
  className = '',
  children,
  parentTag = undefined,
}: BlockProps) => {
  let as: string = '';
  const defaultAlign = parentTag ? 'none' : 'content';
  // if p has not parent, then it is top level item and
  // needs to have x-padding.
  const { alignment, textAlign } = getAlign(className, defaultAlign);

  if (className.includes('is-style-lead')) {
    as = 'leader';
  }

  return (
    <Paragraph as={as} className={classNames(alignment, textAlign)}>
      {children}
    </Paragraph>
  );
};

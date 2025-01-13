import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import { BlockProps } from '@lib/types';
import { tailwindAlignClasses, getAlign } from '@utils/tools';
import { Alignment } from '@components/common';

export const CoreButtons = ({
  children,
  className,
  parentTag = undefined,
}: BlockProps) => {
  // className = tailwindAlignClasses(className);
  // ['justify-center']: justifyContent === 'center',
  // ['justify-end']: justifyContent === 'right',
  // ['flex-nowrap flex-col md:flex-row']: flexWrap === 'nowrap',
  // ['flex-wrap']: flexWrap !== 'nowrap',

  // className = className.replace('is-vertical', 'is-vertical');
  // className = className?.replace(
  // 'is-content-justification-center',
  // 'justify-center'
  // );
  const defaultAlign = parentTag ? 'none' : 'content';
  const { alignment, justify, textAlign, align } = getAlign(
    className,
    defaultAlign
  );

  const wrap = className?.includes('is-nowrap')
    ? '2xl:flex-nowrap'
    : '2xl:flex-wrap';

  return (
    <Alignment
      align={align}
      className={classNames(
        alignment,
        justify,
        textAlign,
        'clear-both flex flex-wrap gap-2 mb-7',
        wrap
      )}
    >
      {children}
    </Alignment>
  );
};

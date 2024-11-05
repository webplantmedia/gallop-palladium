import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import { BlockProps } from '@lib/types';
import { tailwindAlignClasses } from '@utils/tools';

export const CoreButtons = ({ children, className }: BlockProps) => {
  className = tailwindAlignClasses(className);
  // ['justify-center']: justifyContent === 'center',
  // ['justify-end']: justifyContent === 'right',
  // ['flex-nowrap flex-col md:flex-row']: flexWrap === 'nowrap',
  // ['flex-wrap']: flexWrap !== 'nowrap',

  // className = className.replace('is-vertical', 'is-vertical');
  className = className?.replace(
    'is-content-justification-center',
    'justify-center'
  );

  const wrap = className?.includes('is-nowrap')
    ? '2xl:flex-nowrap'
    : '2xl:flex-wrap';

  return (
    <div
      className={classNames(
        className,
        'clear-both flex flex-wrap gap-2 mb-7',
        wrap
      )}
    >
      {children}
    </div>
  );
};

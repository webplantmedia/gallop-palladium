import classNames from 'classnames';
import {
  CoreGroupGrid,
  CoreGroupCard1,
  CoreGroupCard2,
  CoreGroupHero1,
} from '@components/blocks';
import { hasExactClass } from '@utils/tools';
import { domToReact, DOMNode } from 'html-react-parser';
import { BlockProps } from '@lib/types';

export const CoreGroup = ({ className, props, children }: BlockProps) => {
  const { id } = props || {};

  return (
    <div
      id={id}
      className={classNames(
        className,
        'mb-10 [&>*]:mt-0 [&>*]:mb-0 [&>*>*:first-child]:mt-0 [&>*>*:last-child]:mb-0'
      )}
    >
      {children}
    </div>
  );
};

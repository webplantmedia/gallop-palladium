import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { Alignment } from '@components/common';
import { getAlign } from '@utils/tools';

export const CoreGroupGrid = ({
  className,
  props,
  children,
  parentTag,
}: BlockProps) => {
  const { id } = props || {};
  // const masonry = className.includes('is-style-masonry-2') ? true : false;
  className = className?.replace(
    'is-style-columns-1',
    'grid grid-cols-1 gap-20'
  );
  className = className?.replace(
    'is-style-masonry-2',
    'colums-1 md:columns-2 gap-0 gap-x-10 [&>*]:pb-10 md:[&>*]:pb-10 column-fill-balance [&>*]:break-inside-avoid'
  );
  className = className?.replace(
    'is-style-columns-2',
    'grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-20'
  );
  className = className?.replace(
    'is-style-masonry-3',
    'columns-1 lg:columns-2 xl:columns-3 gap-0 gap-x-10 [&>*]:pb-10 md:[&>*]:pb-10 column-fill-balance [&>*]:break-inside-avoid'
  );
  className = className?.replace(
    'is-style-columns-3',
    'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 lg:gap-20'
  );
  className = className?.replace(
    'is-style-columns-4',
    'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-20 lg:gap-20'
  );
  className = className?.replace(
    'is-style-columns-5',
    'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-7 lg:gap-7'
  );
  className = className?.replace('is-vertically-aligned-top', 'items-start');
  className = className?.replace('is-vertically-aligned-bottom', 'items-end');
  className = className?.replace(
    'is-vertically-aligned-middle',
    'items-center'
  );

  const defaultAlign = parentTag ? 'none' : 'content';
  const { align } = getAlign(className, defaultAlign);

  return (
    <Alignment
      align={align}
      id={id}
      className={classNames(
        className,
        'mb-10 [&>*]:mt-0 [&>*]:mb-0 [&>*>*:first-child]:mt-0 [&>*>*:last-child]:mb-0'
      )}
    >
      {children}
    </Alignment>
  );
};

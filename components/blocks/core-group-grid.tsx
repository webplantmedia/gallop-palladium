import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import { BlockProps } from '@lib/types';

export const CoreGroupGrid = ({ className, props, children }: BlockProps) => {
  const { id } = props || {};
  // const masonry = className.includes('is-style-masonry-2') ? true : false;
  className = className?.replace(
    'is-style-columns-1',
    'grid grid-cols-1 gap-10'
  );
  className = className?.replace(
    'is-style-masonry-2',
    'colums-1 md:columns-2 gap-0 gap-x-10 [&>*]:pb-10 md:[&>*]:pb-10 column-fill-balance [&>*]:break-inside-avoid'
  );
  className = className?.replace(
    'is-style-columns-2',
    'grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10'
  );
  className = className?.replace(
    'is-style-masonry-3',
    'columns-1 lg:columns-2 xl:columns-3 gap-0 gap-x-10 [&>*]:pb-10 md:[&>*]:pb-10 column-fill-balance [&>*]:break-inside-avoid'
  );
  className = className?.replace(
    'is-style-columns-3',
    'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-10'
  );
  className = className?.replace('is-vertically-aligned-top', 'items-start');
  className = className?.replace('is-vertically-aligned-bottom', 'items-end');
  className = className?.replace(
    'is-vertically-aligned-middle',
    'items-center'
  );

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

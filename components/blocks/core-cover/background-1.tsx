import classNames from 'classnames';
import { BackgroundMedia, Overlay } from '@components/common';

export const CoreCoverBackground1 = ({ data, className }: any) => {
  const { imgProps, content } = data;
  return (
    <div
      className={classNames(
        'wp-block-cover relative flex items-center justify-center',
        className
      )}
    >
      <BackgroundMedia attr={imgProps} />
      <Overlay className="bg-white/90" />
      <div className="box-content max-w-none relative z-10 py-28 lg:py-32 [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0 w-full">
        {content}
      </div>
    </div>
  );
};

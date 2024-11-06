import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import { tailwindAlignClasses } from '@utils/tools';

export const CoreAudio = ({ className, props }: BlockProps) => {
  className = tailwindAlignClasses(className);
  return (
    <figure className={classNames(className, 'mb-7')}>
      <audio controls className="w-full" src={props?.src}></audio>
    </figure>
  );
};

import classNames from 'classnames';
import { BlockProps } from '@lib/types';

export const CoreAudio = ({ className, props }: BlockProps) => {
  return (
    <figure className={classNames(className, 'mb-7')}>
      <audio controls className="w-full" src={props?.src}></audio>
    </figure>
  );
};

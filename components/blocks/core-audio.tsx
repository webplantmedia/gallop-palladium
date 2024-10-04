import classNames from 'classnames';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import { BlockProps } from '@lib/types';

export const CoreAudio = ({ node, className, options }: BlockProps) => {
  return (
    <>
      {node?.children.map((el: any, index: number) => {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(el.attribs);
        return (
          <figure
            key={'audio-' + index}
            className={classNames(className, 'mb-7')}
          >
            <audio controls className="w-full" src={props?.src}></audio>
          </figure>
        );
      })}
    </>
  );
};

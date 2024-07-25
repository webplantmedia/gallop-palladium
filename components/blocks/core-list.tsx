import { domToReact, DOMNode } from 'html-react-parser';
import Iconify from '@components/iconify';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import { Fragment } from 'react';
import classNames from 'classnames';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const CoreList = ({ node, className, tag, options }) => {
  return (
    <ul
      role="list"
      className={classNames(
        className,
        'leading-normal mb-7 flex flex-col gap-2'
      )}
    >
      {node?.map((block: any, index: number) => {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          block.attribs
        );
        return (
          <Fragment key={'core-media-list-el' + index}>
            {block.name == 'li' && (
              <li className="flex gap-x-3 items-start" key={'li-' + index}>
                <span className="w-3 shrink-0 mt-[0.45rem]">
                  <Iconify
                    className="text-primary-main dmh:text-modern-primary-main w-3 h-3"
                    icon={dotMarkIcon}
                  />
                </span>
                <span className="">
                  {domToReact(block?.children as DOMNode[], options)}
                </span>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

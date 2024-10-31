import Iconify from '@components/iconify';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import { Fragment } from 'react';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';

const CoreListLi = ({ children }: BlockProps) => {
  return (
    <li className="flex gap-x-3 items-start">
      <span className="w-3 shrink-0 mt-[0.45rem]">
        <Iconify
          className="text-primary-main dmh:text-modern-primary-main w-3 h-3"
          icon={dotMarkIcon}
        />
      </span>
      <span className="">{children}</span>
    </li>
  );
};

export const CoreList = ({ data, className }: BlockProps) => {
  return (
    <ul
      role="list"
      className={classNames(
        className,
        'leading-normal mb-7 flex flex-col gap-2'
      )}
    >
      {data?.li?.map((item: any, index: number) => {
        return (
          <CoreListLi key={`core-list-li-${index}`}>{item?.jsx}</CoreListLi>
        );
      })}
    </ul>
  );
};

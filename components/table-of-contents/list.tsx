'use client';

import Link from 'next/link';
import { permalink } from '@utils/tools';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import Iconify from '@components/iconify';
import classNames from 'classnames';

export default function TableOfContentsList({
  closeDialog = () => {},
  toc,
  meta,
}: any) {
  // useEffect(() => {
  // var links = document.querySelectorAll('#table-of-contents ul li a');
  // links.forEach(function (link, index, arr) {
  // link.addEventListener('click', function () {
  // alert('Clicked');
  // });
  // });
  // }, []);

  const scrollIntoViewWithOffset = (id: any, offset: any) => {
    const anchorTarget = document.getElementById(id);
    if (anchorTarget) {
      // console.log(anchorTarget.getBoundingClientRect().top);
      // console.log(window.scrollY);
      // console.log(offset);
      window.scrollTo({
        behavior: 'smooth',
        top: anchorTarget.getBoundingClientRect().top + window.scrollY - offset,
      });
    }
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    const id = event?.target?.id;
    scrollIntoViewWithOffset(id, 90);
  };

  let table: any[] = [];

  let pageTitle = meta.title;

  let tableIntro = (
    <li className="flex" key="toc-0">
      <span className="w-5 h-5 flex items-center shrink-0 justify-center">
        <Iconify
          className="text-primary-main w-2 h-2 relative top-[1px] dmh:text-modern-primary-main"
          icon={dotMarkIcon}
        />
      </span>
      <Link
        prefetch={false}
        scroll={true}
        id={permalink(meta.title)}
        className="hover:text-secondary-main"
        href={'#' + permalink(meta.title)}
        onClick={handleClick}
      >
        {meta.title}
      </Link>
    </li>
  );

  table = Object.values(toc).map((data: any, index: number) => {
    const id = data.id;
    pageTitle = data.level === 1 ? data.name : pageTitle;
    return (
      <li
        className={classNames(data.level === 3 ? 'pl-6' : '', 'flex')}
        key={'toc' + index}
      >
        <span className="w-5 h-5 flex items-center shrink-0 justify-center">
          <Iconify
            className="text-primary-main w-2 h-2 relative top-px dmh:text-modern-primary-main dmh:w-3 dmh:h-3 dmh:top-[2px]"
            icon={dotMarkIcon}
          />
        </span>
        <Link
          scroll={true}
          prefetch={false}
          id={id}
          onClick={handleClick}
          className="text-base-contrast hover:text-secondary-main active:text-base-contrast hover:dmh:text-modern-secondary-light"
          href={'#' + id}
        >
          {data.level === 1 ? 'Introduction' : data.name}
        </Link>
      </li>
    );
  });
  // const li = [tableIntro, ...table];
  const li = [...table];

  return (
    <div
      id="table-of-contents"
      className="overflow-y-scroll h-full scrollbar-hide smooth-scrolling"
    >
      <h2 className="px-6 text-primary-main small-caps mt-8 mb-7 dmh:font-accent dmh:normal-case dmh:variant-normal dmh:text-modern-base-contrast dmh:variant-normal">
        Table of Contents
        <br />
        {pageTitle}
      </h2>
      <ul className="list-none px-6 pb-12 flex flex-col gap-2 pl-5 text-sm">
        {li}
      </ul>
    </div>
  );
}

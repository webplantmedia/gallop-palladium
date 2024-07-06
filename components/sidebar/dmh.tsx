'use client';

import { _profile } from '../../_data/_sidebar';
import SidebarContentDMH from './content-dmh';
import classNames from 'classnames';
// import { useScrolledSidebar } from '@hooks';

export default function SidebarDMH({ className = '' }) {
  // useScrolledSidebar();

  return (
    <aside
      id="sidebar"
      className={classNames(
        className,
        'text-modern-base-contrast w-full max-w-[750px] lg:w-80 mx-auto h-full flex flex-col gap-14 items-end justify-end'
      )}
    >
      <div
        className={classNames(
          'sticky bottom-20 transition-none w-full lg:w-80 ease-out duration-300 rounded-b-md pt-8 bg-modern-base-card'
        )}
      >
        <SidebarContentDMH />
      </div>
    </aside>
  );
}

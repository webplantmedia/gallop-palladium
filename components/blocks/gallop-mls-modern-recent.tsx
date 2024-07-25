'use client';

import classNames from 'classnames';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { state } from '@state';
import { useState, useEffect } from 'react';
import MLSHomeCard from '@components/mls/home-card';
import { usePathname } from 'next/navigation';

export const GallopMLSModernRecent = ({ className, meta, props }) => {
  const [count, setCount] = useState<number>(10);
  const [mlsData, setMlsData] = useState<any[]>(meta.recent || []);
  const path = usePathname();

  if (!mlsData) {
    return (
      <p
        key="no-mls"
        className="px-4 py-4 border-2 border-base-card bg-base-card text-base-contrast rounded-md text-center mb-7 dmh:border-modern-base-card dmh:text-modern-primary-main dmh:bg-modern-base-card"
      >
        No MLS Object.
      </p>
    );
  }

  if (mlsData.length == 0) {
    return (
      <p
        key="no-mls"
        className="px-4 py-4 border-2 border-base-card bg-base-card text-base-contrast rounded-md text-center mb-7 dmh:border-modern-base-card dmh:text-modern-primary-main dmh:bg-modern-base-card"
      >
        No Modern Homes For Sale.
      </p>
    );
  }

  let loadSidebar = (event: any, id: number) => {
    state.dynamicSidebar = {
      type: 'home',
      id: id,
      content: mlsData.filter((home: any) => home.listing_key_numeric == id)[0],
      route: path,
    };
    state.dynamicSidebarOpen = true;
    event.preventDefault();
  };

  return (
    <>
      <div
        className={classNames(
          className,
          'grid grid-cols-1 gap-14 rounded-md mb-14'
        )}
      >
        {mlsData.slice(0, count).map((home: any, index: number) => {
          return (
            <MLSHomeCard
              key={index}
              home={home}
              loadSidebar={loadSidebar}
              showStats={false}
            />
          );
        })}
      </div>
      {mlsData.length > count && (
        <button
          className={classNames(
            'wp-block-button w-full basis-full bg-transparent text-secondary-main hover:bg-white/10 text-center rounded-md shadow-sm flex items-center justify-center py-3 px-5 mb-14 mx-auto !max-w-none clear-both border-2 border-secondary-main'
          )}
          onClick={() => setCount((prev) => prev + 10)}
        >
          Load More MLS Homes
          <ArrowDownIcon
            className="ml-1 -mr-1 h-5 w-5 text-secondary-main"
            aria-hidden="true"
          />
        </button>
      )}
    </>
  );
};

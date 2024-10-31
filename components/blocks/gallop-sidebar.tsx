import React from 'react';
import DynamicSidebar from '@components/sidebar/dynamic';
import { BlockProps } from '@lib/types';

const SEOContent = ({ children }: { children: any }) => {
  return (
    <div className="absolute -left-[9999px] invisible h-0 w-0 overflow-hidden">
      {children}
    </div>
  );
};

export const GallopSidebar = ({
  header,
  content,
  className,
  sidebarHeader,
}: {
  header: any;
  content: any;
  className: any;
  sidebarHeader: any;
}) => {
  return (
    <>
      <DynamicSidebar
        className={className}
        header={header}
        sidebarHeader={sidebarHeader}
      >
        {content}
      </DynamicSidebar>
      <SEOContent>{content}</SEOContent>
    </>
  );
};

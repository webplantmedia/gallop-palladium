'use client';

import { useState } from 'react';
import { _sidebarAboutDMH, _profile } from '../../_data/_sidebar';
import SidebarContent from './content';
import classNames from 'classnames';

export default function SidebarAboutDMH({ className = '' }) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <p className="leading-normal text-base mb-7">
      <span
        className={classNames(
          !isOpen ? 'line-clamp-5 text-ellipsis' : '',
          'leading-normal'
        )}
      >
        {_sidebarAboutDMH + ' '}
      </span>
      <button
        onClick={handleOpen}
        className="cursor-pointer text-modern-primary-main hover:text-modern-primary-lighter pointer leading-normal"
      >
        {!isOpen ? ' See More' : ' See Less'}
      </button>
    </p>
  );
}

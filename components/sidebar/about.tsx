'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function SidebarAbout({ className = '' }) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!isOpen);
  };
  const randomNumber = Math.floor(Math.random() * 4);
  const [message, setMessage] = useState(''); // Default message

  return (
    <>
      <p className="leading-normal text-base mb-5">
        <span
          className={classNames(
            !isOpen ? 'line-clamp-5 text-ellipsis' : '',
            'leading-normal'
          )}
        >
          Placeholder text{' '}
        </span>
        <button
          onClick={handleOpen}
          className="inline cursor-pointer text-secondary-main hover:text-secondary-lighter pointer leading-normal"
        >
          {!isOpen ? 'See More' : 'See Less'}
        </button>
      </p>
      {message && (
        <blockquote>
          <p className="font-accent italic text-lg md:text-xl md:leading-[1.4] leading-normal text-base-contrast2 mb-14 mt-14">
            {message}
          </p>
        </blockquote>
      )}
      <Link
        href="/about/"
        className="w-full justify-center overflow-hidden inline-flex items-center border-2 border-primary-main rounded-md px-12 py-2 text-base font-normal bg-primary-main text-primary-contrast shadow-sm hover:bg-primary-light focus:outline-none whitespace-nowrap"
      >
        <span>Placeholder text</span>
        <ArrowRightIcon
          className="h-4 w-4 flex-none text-modern-base-body-contrast ml-2"
          aria-hidden="true"
        />
      </Link>
    </>
  );
}

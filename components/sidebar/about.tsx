'use client';

import { useState, useEffect } from 'react';
import { _profile } from '@data/_sidebar';
import { _slogans } from '@data/_slogans';
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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * _slogans.length);
    setMessage(_slogans[randomIndex]);
  }, []);

  return (
    <>
      <p className="leading-normal text-base mb-5">
        <span
          className={classNames(
            !isOpen ? 'line-clamp-5 text-ellipsis' : '',
            'leading-normal'
          )}
        >
          Douglas Newby knows the potential inventory of architecturally
          significant homes and the nuances of neighborhoods in Highland Park
          better than any real estate agent in Dallas. Understanding inventory
          is more than relying on MLS or “hip pockets.” It is approaching the
          market as if every home in Dallas is for sale. When a buyer looks for
          a home from that perspective, they are not constrained by a random
          slice of what is presently on the market or hoping something better
          will magically come on the market. A traditional approach leaves
          economics and aesthetics to chance. For decades Douglas Newby has
          identified architecturally significant homes and helped clients select
          neighborhoods in good locations that make them happy.{' '}
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
        <span>About Douglas Newby</span>
        <ArrowRightIcon
          className="h-4 w-4 flex-none text-modern-base-body-contrast ml-2"
          aria-hidden="true"
        />
      </Link>
    </>
  );
}

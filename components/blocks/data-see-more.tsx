'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';

export const DataSeeMore = ({ className, data }) => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const text = data?.text ? data.text : 'Some Text';
  const more = data?.strong?.text ? data.strong.text : 'Read More';

  return (
    <p
      className={classNames(
        className,
        'leading-normal text-base mb-5 text-base-contrast'
      )}
    >
      <span
        className={classNames(
          !isOpen ? 'line-clamp-5 text-ellipsis' : '',
          'leading-normal'
        )}
      >
        {text}
      </span>
      <button
        onClick={handleOpen}
        className="inline cursor-pointer text-primary-main hover:text-primary-lighter pointer leading-normal font-bold"
      >
        {!isOpen ? more : more.replace('More', 'Less')}
      </button>
    </p>
  );
};

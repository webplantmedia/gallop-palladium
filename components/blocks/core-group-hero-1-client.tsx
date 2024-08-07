'use client';

import Iconify from '@components/iconify';
import PlaySolidIcon from '@iconify/icons-heroicons/play-solid';
import { useState, Fragment, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useVimeoPlayerScript } from '@hooks';

export const CoreGroupHero1Client = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  let circleText = data.wpBlockCover?.wpBlockButtons?.wpBlockButton?.a?.text;
  let iframe = data.wpBlockGroup[1].wpBlockEmbed.iframe;
  console.log(iframe);
  circleText += ' - ' + circleText + ' - ';
  const isVimeoPlayerLoaded = useVimeoPlayerScript();

  useEffect(() => {
    if (!isVimeoPlayerLoaded) return;

    if (!isOpen) return;

    const iframe = document.querySelector('iframe[src*="vimeo.com"]');
    if (iframe) {
      const player = new window.Vimeo.Player(iframe);
      player.play();

      return () => {
        player.pause();
      };
    }
  }, [isOpen]);

  return (
    <Fragment>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 bg-white/10 rounded-full border-2 border-white"
      >
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="circle-text absolute w-full h-full animate-spin-slow-reverse">
            {circleText.split('').map((letter: string, index: number) => {
              const length = circleText.length;

              const spacing = Math.round(360 / length);
              const angle = spacing * index;

              return (
                <span
                  className={`absolute top-0 left-0 right-0 h-full flex items-start justify-center origin-center uppercase text-white text-sm`}
                  style={{ transform: `rotate(${angle}deg)` }}
                  key={`rotate-letter-${index}`}
                >
                  {letter}
                </span>
              );
            })}
          </div>
          <div className="absolute w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <Iconify
              icon={PlaySolidIcon}
              className="flex-shrink-0 h-auto w-10 text-primary-main -mr-1"
            />
          </div>
        </div>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-base-darker/25 transition-opacity opacity-100"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-base-card p-7 rounded-lg shadow-lg flex flex-col gap-4">
            <iframe {...iframe} />
          </div>
        </DialogPanel>
      </Dialog>
    </Fragment>
  );
};

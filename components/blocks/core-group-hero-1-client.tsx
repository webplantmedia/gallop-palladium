'use client';

import classNames from 'classnames';
import Iconify from '@components/iconify';
import PlaySolidIcon from '@iconify/icons-heroicons/play-solid';
import { useState, Fragment, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useVimeoPlayerScript } from '@hooks';

export const CoreGroupHero1Client = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  let circleText = data.wpBlockCover?.wpBlockButtons?.wpBlockButton?.a?.text;
  let iframe = { ...data.wpBlockGroup[1].wpBlockEmbed.iframe };
  delete iframe.frameborder;
  delete iframe.width;
  delete iframe.height;
  delete iframe.loading;
  delete iframe.allow;
  iframe.frameBorder = '0';

  const srcUrl = new URL(iframe.src);
  srcUrl.searchParams.set('muted', '1');
  iframe.src = srcUrl.toString();

  const iframeRef = useRef(null);

  circleText += ' - ' + circleText + ' - ';
  const isVimeoPlayerLoaded = useVimeoPlayerScript();

  useEffect(() => {
    if (!isVimeoPlayerLoaded) return;
    if (!isOpen) return;
    if (!isIframeLoaded) return;

    const iframeElement = iframeRef.current;

    if (iframeElement) {
      const player = new window.Vimeo.Player(iframeElement);
      player.play();

      return () => {
        player.pause();
      };
    }
  }, [isOpen, isVimeoPlayerLoaded, isIframeLoaded]);

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
      <Transition unmount={false} appear show={isOpen} as={Fragment}>
        <Dialog
          static={true}
          unmount={false}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <TransitionChild
            unmount={false}
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel
              className={classNames(
                'fixed inset-0 items-center justify-center p-4 flex'
                // isOpen ? 'flex' : 'hidden'
              )}
            >
              <div
                className="fixed inset-0 bg-black/90 transition-opacity opacity-100"
                onClick={() => setIsOpen(false)}
              />
              <div className="shadow-lg max-w-[700px] w-full relative z-10 aspect-video rounded-md overflow-clip">
                <iframe
                  ref={iframeRef}
                  {...iframe}
                  onLoad={() => setIsIframeLoaded(true)}
                  className="w-full block h-full"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

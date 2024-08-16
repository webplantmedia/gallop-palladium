'use client';

import React from 'react';
import Iconify from '@components/iconify';
import XMarkIcon from '@iconify/icons-heroicons/x-mark';
import { getVimeoIframeSrc } from '@utils/tools';
import classNames from 'classnames';
import { useState, Fragment, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useVimeoPlayerScript } from '@hooks';

export function VideoPopup({
  children,
  videoUrl,
  className,
}: {
  children: React.ReactNode;
  videoUrl: string;
  className: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isVimeoPlayerLoaded = useVimeoPlayerScript();
  const src = getVimeoIframeSrc(videoUrl);
  // const srcUrl = new URL(iframeVideoSrc);
  // srcUrl.searchParams.set('muted', '1');
  // iframeVideoSrc = srcUrl.toString();

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

  if (!src) {
    return (
      <a href={videoUrl} className={classNames(className)}>
        {children}
      </a>
    );
  }

  return (
    <Fragment>
      <button onClick={() => setIsOpen(true)} className={classNames(className)}>
        {children}
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
                onClick={() => setIsOpen(false)}
                className="bg-black/90 transition-opacity opacity-100 fixed inset-0 shadow-lg w-full max-w-full z-10 aspect-16/9 flex items-center justify-center"
              >
                <iframe
                  ref={iframeRef}
                  src={src}
                  onLoad={() => setIsIframeLoaded(true)}
                  className="w-[90vw] h-[90vh] max-w-screen-4xl rounded-md"
                  allow="autoplay; fullscreen; picture-in-picture"
                />
              </div>
              <button
                type="button"
                className="absolute z-20 top-0 right-0 rounded-none text-white focus:outline-none focus:ring-0 hover:bg-white/10 p-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <Iconify icon={XMarkIcon} className="h-10 w-10 text-white" />
              </button>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </Fragment>
  );
}

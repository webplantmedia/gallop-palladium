'use client';

import React from 'react';
import Iconify from '@components/iconify';
import XMarkIcon from '@iconify/icons-heroicons/x-mark';
import classNames from 'classnames';
import { useState, Fragment, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useVimeoPlayerScript } from '@hooks';
import { getAspectRatioPadding } from '@utils/tools';

export function VideoPopup({
  children,
  url = null,
  className,
  embed = null,
}: {
  children: React.ReactNode;
  url?: string | null;
  className: string;
  embed: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isVimeoPlayerLoaded = useVimeoPlayerScript();
  const iframe = embed?.wpBlockEmbedWrapper?.iframe || null;
  const aspectRatio = getAspectRatioPadding(embed?.className);

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

  if (!embed) {
    if (!url) {
      return <span className={classNames(className)}>{children}</span>;
    }

    return (
      <a href={url} className={classNames(className)}>
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
                'fixed inset-0 items-center justify-center flex'
                // isOpen ? 'flex' : 'hidden'
              )}
            >
              <div
                onClick={() => setIsOpen(false)}
                className="bg-base-body/90 transition-opacity opacity-100 fixed inset-0 shadow-lg w-full max-w-full z-10 flex items-center justify-center px-4 sm:px-14"
              >
                {embed && (
                  <div
                    className={classNames('max-w-screen-2xl w-full')}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={classNames(
                        'relative',
                        aspectRatio && 'before:block',
                        aspectRatio === '56.25%' && 'before:pt-[56.25%]'
                      )}
                    >
                      <iframe
                        ref={iframeRef}
                        src={iframe.src}
                        width={iframe.width}
                        height={iframe.height}
                        title={iframe.title}
                        frameBorder={0}
                        onLoad={() => setIsIframeLoaded(true)}
                        className="rounded-md absolute inset-0 w-full h-full"
                        allow={iframe.allow}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="absolute z-20 top-0 right-0 rounded-none text-white focus:outline-none focus:ring-0 hover:bg-white/10 p-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <Iconify
                  icon={XMarkIcon}
                  className="h-10 w-10 text-base-contrast"
                />
              </button>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </Fragment>
  );
}

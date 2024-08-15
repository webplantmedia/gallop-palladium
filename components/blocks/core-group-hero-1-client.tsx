'use client';

import classNames from 'classnames';
import Iconify from '@components/iconify';
import PlaySolidIcon from '@iconify/icons-heroicons/play-solid';
import XMarkIcon from '@iconify/icons-heroicons/x-mark';
import { useState, Fragment, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useVimeoPlayerScript } from '@hooks';
import { getVimeoIframeSrc } from '@utils/tools';

interface IframeAttributes {
  frameBorder?: string;
  src?: string;
}

export const CoreGroupHero1Client = ({ circleText, videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const circleTextRef = useRef<HTMLDivElement>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  circleText += ' - ' + circleText + ' - ';
  const isVimeoPlayerLoaded = useVimeoPlayerScript();
  let iframeVideoSrc = getVimeoIframeSrc(videoUrl);
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

  useEffect(() => {
    const circleTextElement = circleTextRef.current;
    if (!circleTextElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            circleTextElement.classList.add('animate-spin-slow-reverse');
          } else {
            circleTextElement.classList.remove('animate-spin-slow-reverse');
          }
        });
      },
      { threshold: 0.01 } // Trigger when 50% of the element is visible
    );

    observer.observe(circleTextElement);

    return () => {
      if (circleTextElement) observer.unobserve(circleTextElement);
    };
  }, []);

  return (
    <Fragment>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 bg-white/10 hover:bg-white/20 rounded-full border-2 border-white transition-colors duration-300 ease-in-out"
      >
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div
            ref={circleTextRef}
            className="circle-text absolute w-full h-full animate-spin-slow-reverse"
          >
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
                onClick={() => setIsOpen(false)}
                className="bg-black/90 transition-opacity opacity-100 fixed inset-0 shadow-lg w-full max-w-full z-10 aspect-16/9 rounded-md overflow-clip flex items-center justify-center"
              >
                <iframe
                  ref={iframeRef}
                  src={iframeVideoSrc}
                  onLoad={() => setIsIframeLoaded(true)}
                  className="w-[90vw] h-[90vh] max-w-screen-4xl"
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
};

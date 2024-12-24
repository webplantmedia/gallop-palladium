'use client';

import Link from 'next/link';
import pencilSolidIcon from '@iconify/icons-heroicons/pencil-solid';
import tableOfContentsIcon from '@iconify/icons-carbon/table-of-contents';
import Iconify from '@components/iconify';
import { Disclosure, Dialog, Transition, Popover } from '@headlessui/react';
import SidebarContent from '@components/sidebar/content';
import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { state } from '@state';
// import Image from 'next/image';
import TableOfContentsList from '@components/table-of-contents/list';
import DisableScroll from '../global/disable-scroll';

export default function TableOfContents({ toc, meta }: any) {
  // let [isOpen, setIsOpen] = useState(false);

  // const closeModal = () => {
  // state.dialogOpen = false;
  // setIsOpen(false);
  // };

  // const openModal = () => {
  // state.dialogOpen = true;
  // setIsOpen(true);
  // };
  // console.log(isOpen);

  return (
    <Popover>
      {({ open }: { open: boolean }) => (
        <>
          {/* Mobile menu button */}
          <div className="flex items-center">
            {open && <DisableScroll />}
            <Popover.Button className="rounded-full bg-primary-main hover:bg-primary-light w-12 h-12 flex items-center justify-center dmh:bg-modern-primary-main dmh:hover:bg-modern-primary-light">
              <span className="sr-only">Open table of contents</span>
              <Iconify
                className="w-7 h-7 text-white"
                icon={tableOfContentsIcon}
              />
            </Popover.Button>
          </div>
          <Transition appear={true} unmount={false} show={open} as={Fragment}>
            <Popover.Panel unmount={false} as="div" className="relative z-40">
              {({ close }: { close: () => void }) => (
                <>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    unmount={false}
                  >
                    <div
                      onClick={() => {
                        close();
                      }}
                      className="fixed inset-0 bg-base-darker/25 bg-opacity-100 transition-opacity dmh:bg-modern-base-card/30"
                    />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="-translate-x-0"
                    leaveTo="translate-x-full"
                    unmount={false}
                  >
                    <div className="fixed inset-0 font-body h-screen min-h-screen text-base max-w-[86%] sm:max-w-[24rem] w-full right-0 left-auto">
                      <div className="flex justify-end h-full">
                        <div className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle transition-all overflow-hidden overflow-y-auto scrollbar-hide w-full dmh:bg-modern-base-card">
                          <div className="relative flex items-center justify-start flex-col h-full py-6">
                            <div className="px-8 w-full">
                              <div className="w-full flex items-start justify-between">
                                <h3 className="text-primary-main">
                                  <img
                                    src="/dougnewby-carriage@390.png"
                                    className="block w-[110px] -ml-2"
                                    alt="Douglas Newby Origins"
                                    // quality={100}
                                    width={390}
                                    height={162}
                                  />
                                </h3>
                                <div className="ml-3 flex h-7 items-center">
                                  <button
                                    type="button"
                                    className="rounded-full bg-base-body text-base-contrast focus:outline-none focus:ring-0 hover:bg-white/10 p-1.5 -mx-2.5 dmh:bg-modern-base-card dmh:text-modern-primary-main dmh:hover:bg-white/50"
                                    onClick={() => {
                                      close();
                                    }}
                                  >
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 w-full flex flex-col gap-3">
                              <TableOfContentsList
                                closeDialog={close}
                                toc={toc}
                                meta={meta}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

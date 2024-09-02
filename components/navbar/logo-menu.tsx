'use client';

import { Disclosure, Dialog, Transition } from '@headlessui/react';
import SidebarContent from '@components/sidebar/content';
import SidebarContentDMH from '@components/sidebar/content-dmh';
import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { state } from '@state';
// import Image from 'next/image';

export default function LogoMenu({ sidebarContent = 'default' }) {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    state.dialogOpen = false;
    setIsOpen(false);
  };

  const openModal = () => {
    state.dialogOpen = true;
    setIsOpen(true);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="flex items-center">
        <button
          onClick={openModal}
          className="flex bg-white dmh:bg-transparent focus:outline-none transition-all"
        >
          <span className="sr-only">Douglas Newby</span>
          <span className="relative inline-block">
            <img
              className="h-28 box-border border-l border-r border-b border-white w-[99px] dmh:w-[64px] dmh:h-[64px] dmh:border-none dmh:rounded-full dmh:object-cover dmh:object-center"
              src="/dougpicture-198.jpg"
              alt="Douglas Newby Profile"
              width={198}
              height={220}
              // quality={100}
            />
            <span className="absolute top-[5px] block right-[6px] h-3 w-3 rounded-full bg-green-400 ring-1 ring-white dmh:top-[3px] dmh:right-[3px]" />
          </span>
        </button>
      </div>
      <Transition appear={true} unmount={false} show={isOpen} as={Fragment}>
        <Dialog
          unmount={false}
          as="div"
          className="relative z-40"
          onClose={closeModal}
        >
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
            <div className="fixed inset-0 bg-base-darker/25 transition-opacity opacity-100 dmh:bg-modern-base-card/30" />
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
            <div className="fixed inset-0 font-body h-[var(--app-height)] text-base max-w-[86%] sm:max-w-[24rem] w-full right-0 left-auto">
              <div className="flex justify-end h-full">
                <Dialog.Panel className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle transition-all overflow-hidden overflow-y-auto scrollbar-hide w-full dmh:bg-modern-base-card">
                  <div className="relative flex items-center justify-start flex-col h-full py-6">
                    <div className="px-4 sm:px-8 w-full">
                      <div className="w-full flex items-start justify-between dmh:justify-end">
                        {sidebarContent !== 'dmh' && (
                          <Dialog.Title className="text-primary-main dmh:text-modern-primary-main">
                            <img
                              src="/dougnewby-carriage@390.png"
                              className="block w-[110px] -ml-2"
                              alt="Douglas Newby Origins"
                              // quality={100}
                              width={390}
                              height={162}
                            />
                          </Dialog.Title>
                        )}
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-full bg-base-body text-base-contrast focus:outline-none focus:ring-0 hover:bg-white/10 p-1.5 -mx-2.5 dmh:bg-modern-base-card dmh:text-modern-primary-main dmh:hover:bg-white/50"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 w-full flex flex-col gap-3">
                      {sidebarContent == 'dmh' && <SidebarContentDMH />}
                      {sidebarContent == 'default' && <SidebarContent />}
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

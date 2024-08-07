'use client';

import { useEffect, Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSnapshot } from 'valtio';
import { state } from '@state';
import { Dialog, Transition } from '@headlessui/react';
import MLSHomeOverview from '@components/mls/home-overview';
import NeighborhoodContent from './neighborhood-content';
import { usePathname } from 'next/navigation';

// Fix "Loading..." state when closing the bar

export default function DynamicSidebar({ layout = '' }) {
  const snap = useSnapshot(state);
  const path = usePathname();

  const closeDynamicSidebar = () => {
    state.dynamicSidebarOpen = false;
    state.dynamicSidebar.type = '';
    setData(null);
  };

  let post = snap.dynamicSidebar;

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (post.type) {
      setData(JSON.parse(JSON.stringify(post.content)));
    } else {
      setData(null);
    }
  }, [post]);

  if (snap.dynamicSidebarOpen) {
    if (path != snap.dynamicSidebar.route) {
      closeDynamicSidebar();
    }
  }

  return (
    <>
      <Transition
        appear={true}
        unmount={false}
        show={snap.dynamicSidebarOpen}
        as={Fragment}
      >
        <Dialog
          unmount={false}
          as="div"
          className="relative z-40"
          onClose={closeDynamicSidebar}
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
            <div className="fixed inset-0 bg-base-darker/25 transition-opacity opacity-100 dmh:bg-modern-primary-main/25" />
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
            <div className="fixed inset-0 font-body h-[var(--app-height)] text-base max-w-[86%] sm:max-w-[40%] w-full right-0 left-auto scroll-smooth">
              <div className="flex justify-end h-full">
                <Dialog.Panel className="pointer-events-auto h-full bg-base-body shadow-xl text-left align-middle transition-all overflow-hidden overflow-y-auto scrollbar-hide w-full dmh:bg-modern-base-body">
                  <div className="relative flex items-center justify-start flex-col h-full pt-6">
                    <div className="px-8 w-full">
                      <div className="w-full flex items-start justify-between">
                        {layout === 'modern' && (
                          <Dialog.Title className="text-primary-main dmh:text-modern-primary-main">
                            Details
                          </Dialog.Title>
                        )}
                        {layout !== 'modern' && (
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
                            className="rounded-full bg-base-body text-base-contrast focus:outline-none focus:ring-0 hover:bg-white/10 p-1.5 -mx-2.5 dmh:text-modern-primary-contrast dmh:bg-modern-primary-main hover:dmh:bg-modern-primary-light hover:dmh:text-modern-primary-contrast"
                            onClick={closeDynamicSidebar}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="h-full mx-4 md:mx-8 ">
                      {data ? (
                        post.type == 'neighborhood' ? (
                          <NeighborhoodContent
                            data={data}
                            closeSidebar={closeDynamicSidebar}
                          />
                        ) : (
                          <MLSHomeOverview
                            data={data}
                            layout={layout}
                            closeSidebar={closeDynamicSidebar}
                          />
                        )
                      ) : (
                        <p className="md:py-8">Loading...</p>
                      )}
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

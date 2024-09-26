'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';
import Link from 'next/link';
import { replaceWordPressUrlRelative } from '@utils/tools';

const SubMenu = ({ items, onClick }) => {
  return items.map((item: any, index: number) => {
    const href = item?.p?.a?.href
      ? replaceWordPressUrlRelative(item.p.a.href)
      : '#';
    const text = item?.p?.a?.text ? item.p.a.text : 'Menu Item';

    var img: any = {};
    if (item?.wpBlockImage?.img) {
      img = { ...item.wpBlockImage.img };
    }
    const description = '';

    return (
      <Link
        prefetch={true}
        key={`sub-menu-${index}`}
        className="relative flex justify-start text-left rounded-md overflow-hidden bg-base-body cursor-pointer hover:bg-white/30 dmh:bg-modern-base-card dmh:hover:bg-white/30 min-h-20"
        href={href}
        onClick={onClick}
      >
        <div className="relative">
          {img && (
            <img
              className="rounded-none w-28 h-full object-cover object-center"
              alt={img.alt}
              src={img.src}
              srcSet={img.srcset}
              sizes={img.sizes}
              width={img.width}
              height={img.height}
            />
          )}
        </div>
        <div className="flex py-2 flex-col justify-center align-center text-left w-full px-4 border-l-0 rounded-r-md border border-base-contrast/20">
          <span className="text-primary-main text-base dmh:text-modern-base-contrast">
            {text}
          </span>
          {description && (
            <p className="text-base-contrast text-sm italic dmh:text-modern-base-contrast/60">
              {description}
            </p>
          )}
        </div>
      </Link>
    );
  });
};
export default function MobileMenuLinkDropdown({ data, closeModal }) {
  const dropdownText = data?.p?.text ? data.p.text : 'Dropdown';
  const dropdownItems = data?.wpBlockGroup?.wpBlockGroup
    ? data.wpBlockGroup.wpBlockGroup
    : [];
  const href = data?.a?.href ? replaceWordPressUrlRelative(data.a.href) : '#';

  return (
    <Disclosure as="div" className="w-full">
      {({ open }) => (
        <>
          <DisclosureButton
            as="a"
            href={href}
            className="text-base-contrast border border-base-contrast/20 align-center flex w-full justify-start rounded-md py-3 px-4 bg-base-body cursor-pointer hover:bg-white/30 items-center dmh:bg-modern-base-card dmh:hover:bg-white/30"
          >
            <span className="flex justify-start items-center w-full gap-x-2">
              {/* Include the Iconify component if needed */}
              {/*<Iconify
                                    className="w-5 h-5 shrink-0 mr-2"
                                    icon={item.icon} // Ensure `item.icon` has the correct Iconify icon identifier
                                  />*/}
              <span className="w-full">{dropdownText}</span>
            </span>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 relative text-base-contrast transition`}
            />
          </DisclosureButton>
          <DisclosurePanel as="div" className="flex flex-col gap-3 mt-3">
            <SubMenu items={dropdownItems} onClick={closeModal} />
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

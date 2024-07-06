import { _cta, _profile, _follow } from '../../_data/_sidebar';
import SidebarAccordion from './accordion';
import Link from 'next/link';
import SidebarAboutDMH from './about-dmh';
// import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SidebarDMH() {
  return (
    <>
      <h3 className="px-4 sm:px-8 text-modern-primary-main mb-4">
        <Link prefetch={false} href="/about">
          Purveyor of Modern
        </Link>
        <Link prefetch={false} href="/about">
          <span className="text-modern-base-contrast block pt-5 text-xl variant-normal ">
            Douglas Newby
          </span>
        </Link>
      </h3>
      <div className="mb-10 px-4 sm:px-8">
        <Link prefetch={false} href="/about/">
          <img
            className="rounded-sm mb-4"
            alt="Award-Winning Realtor Douglas Newby"
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/9342/doug_Ted-750x500.jpg"
            width={750}
            height={500}
            // quality={100}
          />
        </Link>
        <SidebarAboutDMH />
        <Link
          href="/dallas-modern-homes/mls/"
          className="inline-flex justify-center items-center rounded-md px-4 py-3 text-base font-normal border-base-contrast text-modern-base-body-contrast shadow-sm hover:bg-primary-light hover:border-primary-light focus:outline-none gap-x-2 border-2 hover:dmh:bg-modern-primary-main hover:dmh:border-modern-primary-main hover:dmh:text-primary-contrast mt-2 w-full"
        >
          <span>Modern Homes in MLS</span>
          <ArrowRightIcon
            className="h-4 w-4 flex-none text-modern-base-body-contrast"
            aria-hidden="true"
          />
        </Link>
      </div>
      <div className="pb-10 text-base">
        {_profile.map((item, index) => (
          <SidebarAccordion item={item} key={index} />
        ))}
      </div>
      <div className="pb-10 px-4 sm:px-8">
        <h3 className="flex items-center text-base-contrast">
          Follow:
          <span className="ml-3 flex gap-2">
            {_follow.map((item, index) => (
              <Link
                prefetch={false}
                key={index}
                className="flex items-center justify-center hover:scale-110 transition-all"
                href={item.href}
              >
                {item.icon}
              </Link>
            ))}
          </span>
        </h3>
      </div>
      <div className="pb-10 px-4 sm:px-8 flex flex-col gap-y-3">
        <h3 className="text-modern-primary-main text-base">
          Call Douglas Newby to See if He Should Represent You
        </h3>
        {_cta.map((item, index) => (
          <Link
            prefetch={false}
            key={index}
            className="gap-x-2 rounded-md shadow-sm w-full text-sm py-3 px-5 bg-modern-primary-main text-modern-primary-contrast hover:bg-modern-primary-light flex items-center text-left justify-start"
            href={item.href}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
}

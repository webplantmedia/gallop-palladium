import SidebarAccordion from './accordion';
import classNames from 'classnames';
import Link from 'next/link';
import SidebarAbout from './about';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
// import Image from 'next/image';

export default function Sidebar() {
  return (
    <>
      <h3 className="px-4 sm:px-8 text-primary-main small-caps mb-4">
        <Link prefetch={false} href="/about/">
          Award-Winning Realtor
        </Link>
        <Link prefetch={false} href="/about">
          <span className="text-base-contrast block pt-5 text-xl variant-normal ">
            Douglas Newby
          </span>
        </Link>
      </h3>
      <div className="mb-10 px-4 sm:px-8">
        <Link prefetch={false} href="/about">
          <img
            className="rounded-sm mb-4"
            alt="Award-Winning Realtor Douglas Newby"
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/9342/doug_Ted-750x500.jpg"
            width={750}
            height={500}
            // quality={100}
          />
        </Link>
        <SidebarAbout />
      </div>
      <div className="pb-10 text-base"></div>
      <div className="pb-10 px-4 sm:px-8">
        <h3 className="flex items-center text-base-contrast">
          Follow:
          <span className="ml-3 flex gap-2"></span>
        </h3>
      </div>
      <div className="pb-10 px-4 sm:px-8 flex flex-col gap-y-3">
        <h3 className="text-primary-main small-caps text-lg">
          Call Douglas Newby to See if He Should Represent You
        </h3>
      </div>
    </>
  );
}

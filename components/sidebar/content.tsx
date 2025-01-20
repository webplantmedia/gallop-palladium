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
        <Link scroll={false} prefetch={true} href="/about/">
          Placeholder text
        </Link>
        <Link scroll={false} prefetch={true} href="/about">
          <span className="text-base-contrast block pt-5 text-xl variant-normal ">
            Placeholder text
          </span>
        </Link>
      </h3>
      <div className="mb-10 px-4 sm:px-8">
        <Link scroll={false} prefetch={true} href="/about">
          <img
            className="rounded-sm mb-4"
            alt="Placeholder text"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png"
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
          Placeholder text
        </h3>
      </div>
    </>
  );
}

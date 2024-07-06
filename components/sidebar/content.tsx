import { _cta, _profile, _follow } from '../../_data/_sidebar';
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
        <h3 className="text-primary-main small-caps text-lg">
          Call Douglas Newby to See if He Should Represent You
        </h3>
        {_cta.map((item, index) => (
          <Link
            prefetch={false}
            key={index}
            className="gap-x-2 rounded-md shadow-sm w-full text-base py-3 px-5 bg-secondary-main text-secondary-contrast hover:bg-secondary-light flex items-center text-left justify-start"
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

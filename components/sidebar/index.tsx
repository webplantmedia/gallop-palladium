import SidebarContent from './content';
import classNames from 'classnames';

export default function Sidebar({ className = '' }) {
  return (
    <aside
      id="sidebar"
      className={classNames(
        className,
        'text-base-contrast w-full max-w-[750px] lg:w-80 mx-auto h-full flex flex-col gap-14 items-end justify-end'
      )}
    >
      <div
        className={classNames(
          'sticky bottom-20 transition-none w-full lg:w-80 ease-out duration-300 rounded-b-md pt-8 bg-base-card shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_0px_4px_1px_rgba(0,0,0,0.1)]'
        )}
      >
        <SidebarContent />
      </div>
    </aside>
  );
}

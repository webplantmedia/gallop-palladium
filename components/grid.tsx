import Sidebar from '@components/sidebar';
import classNames from 'classnames';

export default function Grid({ children, className = '' }) {
  return (
    <>
      <div className="2xl:container mx-auto px-4 sm:px-8 relative">
        <div
          id="grid"
          className={classNames(
            // 'grid-cols-1 grid xl:grid-cols-[1fr_20rem] gap-20',
            className
          )}
        >
          <div className="w-full pl-0 xl:pl-0 pr-0 xl:pr-0 h-full flex flex-col-reverse md:flex md:flex-col">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

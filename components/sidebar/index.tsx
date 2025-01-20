import classNames from 'classnames';

export default function Sidebar({ className = '' }) {
  return (
    <aside
      id="sidebar"
      className={classNames(
        className,
        'text-base-contrast w-full max-w-[750px] lg:w-80 mx-auto h-full flex flex-col gap-14 items-end justify-end'
      )}
    ></aside>
  );
}

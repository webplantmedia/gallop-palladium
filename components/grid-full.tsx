import classNames from 'classnames';

export default function GridFull({ children, className = '' }: any) {
  return (
    <>
      <div className="mx-auto relative">
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

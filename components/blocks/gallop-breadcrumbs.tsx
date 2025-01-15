import classNames from 'classnames';
import Link from 'next/link';
import { BreadcrumbsMenu } from './gallop-breadcrumbs-client';
import { Alignment } from '@components/common';
import { replaceWordPressUrlRelative } from '@utils/tools';
import parse from 'html-react-parser';

export function GallopBreadcrumbs({ breadcrumbs, className }: any) {
  const breadcrumbsLength = breadcrumbs.length;
  let classNameList = 'relative w-full wp-block-group pt-16';
  if (className.includes('is-style-bottom-spacing')) {
    classNameList += ' mb-14';
  }
  return (
    <Alignment align="wide" className={classNameList}>
      <nav className="flex relative" aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex gap-3 w-full flex-nowrap md:flex-wrap md:flex-row flex-col  md:w-auto"
        >
          {breadcrumbs.map((item: any, key: any) => {
            const showBreadCrumb =
              key === breadcrumbsLength - 1 ||
              (key === 1 && key !== breadcrumbsLength);

            return (
              <li
                key={key}
                className={classNames(
                  'md:flex',
                  showBreadCrumb ? 'flex' : 'hidden'
                )}
              >
                <div
                  className={classNames(
                    'flex relative justify-items-stretch items-stretch shadow w-full rounded-md md:w-auto'
                  )}
                >
                  {!(item?.children?.length > 0) && (
                    <>
                      <Link
                        prefetch={true}
                        href={
                          item?.href
                            ? replaceWordPressUrlRelative(item.href)
                            : '#'
                        }
                        className={classNames(
                          'flex items-center rounded-md bg-base-darker/10 w-full px-4 py-2 shadow text-base gap-2 text-secondary-main hover:text-secondary-lighter md:w-auto'
                        )}
                      >
                        {item?.icon && item?.icon}
                        <span className="">{parse(item?.post_title)}</span>
                      </Link>
                    </>
                  )}
                  {item?.children?.length > 0 && (
                    <>
                      <Link
                        prefetch={true}
                        href={
                          item?.href
                            ? replaceWordPressUrlRelative(item.href)
                            : '#'
                        }
                        className={classNames(
                          'flex items-center rounded-l-md bg-base-darker/10 w-full px-4 py-2 gap-2 text-secondary-main hover:text-secondary-lighter md:w-auto'
                        )}
                      >
                        {item?.icon && item?.icon}
                        <span>{parse(item?.post_title)}</span>
                      </Link>
                      <BreadcrumbsMenu dropdown={item?.children} />
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </Alignment>
  );
}

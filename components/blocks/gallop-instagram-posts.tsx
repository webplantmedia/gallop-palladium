import classNames from 'classnames';
import {
  captureVarsInHtml,
  formatAMPM,
  grabMatch,
} from '../../lib/utils/tools';
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

const GallopDisplayInstagramPosts = ({
  heading,
  imgSrc,
  imgWidth,
  imgHeight,
  imgAlt,
  imgTitle,
  paragraph,
  href,
}) => {
  return (
    <section className="">
      <div className="bg-white/10 shadow-lg rounded-sm p-0">
        {imgSrc && (
          <Link prefetch={false} className="block" href={href}>
            <img
              alt={imgAlt}
              title={imgTitle}
              className="mb-0 rounded-sm"
              src={imgSrc}
            />
          </Link>
        )}
        <div className="p-8 flex flex-col h-full">
          {heading && href && (
            <h3 className="mb-4 leading-tight text-2xl sm:text-2xl text-primary-main small-caps">
              <Link prefetch={false} href={href}>
                {heading}
              </Link>
            </h3>
          )}
          {paragraph && (
            <p className="mb-8 leading-normal text-base line-clamp-5 text-ellipsis">
              <span dangerouslySetInnerHTML={{ __html: paragraph }} />{' '}
            </p>
          )}
          {href && (
            <Link
              prefetch={false}
              href={href}
              className="bg-secondary-main text-secondary-contrast hover:bg-secondary-light text-sm py-2 px-4 w-full text-center rounded-md shadow-sm flex items-center justify-center mt-auto"
            >
              Continue Reading
              <ArrowSmallRightIcon
                className="ml-1 -mr-1 h-5 w-5 text-primary-contrast"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export const GallopInstagramPosts = ({ className, node }) => {
  return (
    <div
      className={classNames(
        className,
        'grid grid-cols-1 md:grid-cols-2 gap-8 mb-14'
      )}
    >
      {node.map((post: any, index: number) => {
        if (post?.type === 'tag') {
          const props: HTMLAttributeProps = castToHTMLAttributeProps(
            post.attribs
          );
          let { className } = props;
          if (className?.includes('instagram-single-post')) {
            let {
              heading,
              imgSrc,
              imgWidth,
              imgAlt,
              imgTitle,
              imgHeight,
              paragraph,
              href,
            } = captureVarsInHtml(post);

            return (
              <GallopDisplayInstagramPosts
                key={'instagram-single-post-' + index}
                heading={heading}
                imgSrc={imgSrc}
                imgWidth={imgWidth}
                imgAlt={imgAlt}
                imgTitle={imgTitle}
                imgHeight={imgHeight}
                paragraph={paragraph}
                href={href}
              />
            );
          }
        }

        return '';
      })}
    </div>
  );
};

import classNames from 'classnames';
import { formatAMPM, grabMatch } from '../../lib/utils/tools';
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid';
import { replaceWordPressUrl } from '@lib/utils/tools';

export const GallopBlogPosts = ({ className, meta }) => {
  if (!meta?.blog) {
    return <p>No Blog</p>;
  }

  const { blog } = meta;

  return (
    <div
      className={classNames(
        className,
        'grid grid-cols-1 md:grid-cols-2 gap-8 mb-14'
      )}
    >
      {blog.map((post: any, index: number) => {
        const p = post?.node;
        const d = new Date(p?.date);
        const date = formatAMPM(d);
        let content = grabMatch(/<p[^>]*>(.*?)<\/p>/g, p?.excerpt);
        const link = p?.link;
        // const link = replaceWordPressUrl(p?.link);

        return (
          <section key={index} className="">
            <div className="bg-white/10 shadow-lg rounded-sm p-0">
              <a className="block" href={link}>
                <img
                  alt={p?.featuredImage?.node?.altText}
                  title={p?.featuredImage?.node?.title}
                  className="mb-0 rounded-sm"
                  src={p?.featuredImage?.node?.mediaItemUrl}
                />
              </a>
              <div className="p-8 flex flex-col h-full">
                <h3 className="mb-4 leading-tight text-2xl sm:text-2xl text-primary-main small-caps">
                  <a href={link}>{p?.title}</a>
                </h3>
                <p className="mb-8 leading-normal text-base line-clamp-5 text-ellipsis">
                  <span dangerouslySetInnerHTML={{ __html: content }} />{' '}
                </p>
                <a
                  href={link}
                  className="bg-secondary-main text-secondary-contrast hover:bg-secondary-light text-sm py-2 px-4 w-full text-center rounded-md shadow-sm flex items-center justify-center mt-auto"
                >
                  Continue Reading
                  <ArrowSmallRightIcon
                    className="ml-1 -mr-1 h-5 w-5 text-primary-contrast"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

import DynamicSidebar from '@components/sidebar/dynamic';
import EditLink from '@components/edit-link';
import H1 from '@components/h-1';
import { ParseBlocks } from '@components/blocks';
import TableOfContentsMenu from '@components/table-of-contents';
import { parseContent } from './parse-content';
import { GalleryPopup } from '@components/lightbox/gallery-popup';
import { captureMediaElements } from '@components/content/capture-media-elements';
import { replaceWordPressUrl } from '@utils/tools';
import Link from 'next/link';

export default function ContentBlog({
  content,
  meta,
  posts,
  paged = 1,
  category,
}) {
  let toc: any = [];
  let hasH1: boolean;

  if (posts && posts?.edges && posts?.edges.length) {
    const blogHtml = posts?.edges
      ?.map((post: any) => {
        let heading =
          post?.node?.title && !post.node.title.startsWith('Quote')
            ? '<h2 class="wp-block-heading alignfull is-style-h1"><a href="' +
              replaceWordPressUrl(post?.node?.link) +
              '">' +
              post?.node?.title +
              '</a></h2>'
            : '';
        return heading + post?.node?.content;
      })
      .join('<hr />');

    if (paged > 1) {
      content = blogHtml;
      if (content.includes('<h1')) {
        content = content.replace('</h1>', ' - Page ' + paged + '</h1>');
      } else {
        content =
          '<h1 class="wp-block-heading alignfull">' +
          meta.title +
          ' - Page ' +
          paged +
          '</h1>' +
          content;
      }
    } else {
      content += blogHtml;
    }
  }
  const haveMorePosts = Boolean(posts?.pageInfo?.hasNextPage);

  ({ content, toc, hasH1 } = parseContent(content));

  let article = (
    <article className="main-content pt-12">
      {!hasH1 && <H1 meta={meta} />}
      <ParseBlocks content={content} meta={meta} />
      <hr className="mt-16 mb-16 md:mt-20 md:mb-20 border-base-contrast/30 dmh:border-modern-primary-main" />
      <div className="flex flex-nowrap gap-7">
        {paged === 2 && (
          <Link
            prefetch={false}
            className="bg-secondary-main text-secondary-contrast hover:bg-secondary-light text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 w-full"
            href={'/' + category + '/'}
          >
            Prev Page
          </Link>
        )}
        {paged > 2 && (
          <Link
            prefetch={false}
            className="bg-secondary-main text-secondary-contrast hover:bg-secondary-light text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 w-full"
            href={'/' + category + '/page/' + (paged - 1) + '/'}
          >
            Prev Page
          </Link>
        )}
        {haveMorePosts && (
          <Link
            prefetch={false}
            className="bg-secondary-main text-secondary-contrast hover:bg-secondary-light text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 w-full"
            href={'/' + category + '/page/' + (paged + 1) + '/'}
          >
            Next Page
          </Link>
        )}
      </div>
      <div className="fixed bottom-5 right-5 z-40 flex gap-2">
        <EditLink meta={meta} />
        <TableOfContentsMenu toc={toc} meta={meta} />
      </div>
    </article>
  );

  let { slides } = captureMediaElements(content);

  return (
    <>
      {article}
      <DynamicSidebar />
      <GalleryPopup slides={slides} />
    </>
  );
}

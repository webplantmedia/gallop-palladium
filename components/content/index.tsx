import EditLink from '@components/edit-link';
import { ParseBlocks } from '@components/blocks';
import { parseContent } from './parse-content';
import { GalleryPopup } from '@components/lightbox/gallery-popup';
import { captureMediaElements } from '@components/content/capture-media-elements';
import { Heading } from '@components/common';
import SmoothScroll from '@components/scripts/smooth-scroll';

interface Props {
  post?: any;
  meta?: any;
  sidebarHeader?: any;
  breadcrumbs?: any;
}

export default function Content({
  post,
  meta = {},
  sidebarHeader,
  breadcrumbs = [],
}: Props) {
  let toc: any = [];
  let hasH1: boolean;
  let content: string;

  ({ content, toc, hasH1 } = parseContent(post?.postContent));

  let article = (
    <>
      <article className="main-content [&>*:last-child:not(.alignfull)]:!mb-32">
        {!hasH1 && <Heading as="h1">{post?.postTitle}</Heading>}
        {content && typeof content === 'string' && (
          <ParseBlocks
            content={content}
            meta={meta}
            sidebarHeader={sidebarHeader}
            breadcrumbs={breadcrumbs}
          />
        )}
      </article>
      <div className="fixed bottom-5 right-5 z-40 flex gap-2 !px-0">
        <EditLink meta={meta} />
      </div>
    </>
  );

  let { slides } = captureMediaElements(content);

  return (
    <>
      {article}
      <GalleryPopup />
    </>
  );
}

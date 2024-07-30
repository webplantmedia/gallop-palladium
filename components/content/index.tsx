import DynamicSidebar from '@components/sidebar/dynamic';
import EditLink from '@components/edit-link';
import H1 from '@components/h-1';
import { ParseBlocks } from '@components/blocks';
import TableOfContentsMenu from '@components/table-of-contents';
import { parseContent } from './parse-content';
import { GalleryPopup } from '@components/lightbox/gallery-popup';
import { captureMediaElements } from '@components/content/capture-media-elements';

export default function Content({ post, meta = {} }) {
  let toc: any = [];
  let hasH1: boolean;
  let content: string;

  ({ content, toc, hasH1 } = parseContent(post.post_content));

  let article = (
    <article className="main-content">
      <ParseBlocks content={content} meta={meta} />
      <div className="fixed bottom-5 right-5 z-40 flex gap-2 !px-0">
        <EditLink meta={meta} />
        <TableOfContentsMenu toc={toc} meta={meta} />
      </div>
    </article>
  );

  let { slides } = captureMediaElements(content);

  return (
    <>
      {article}
      <GalleryPopup slides={slides} />
    </>
  );
}

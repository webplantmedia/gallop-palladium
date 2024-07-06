import DynamicSidebar from '@components/sidebar/dynamic';
import EditLink from '@components/edit-link';
import H1 from '@components/h-1';
import { ParseBlocks } from '@components/blocks';
import TableOfContentsMenu from '@components/table-of-contents';
import { parseContent } from './parse-content';
import { GalleryPopupDMH } from '@components/lightbox/gallery-popup-dmh';
import { captureMediaElements } from '@components/content/capture-media-elements';

export default function ContentDMH({ content, meta }) {
  let toc: any = [];
  let hasH1: boolean;

  ({ content, toc, hasH1 } = parseContent(content));

  let article = (
    <article className="main-content pt-12">
      {!hasH1 && <H1 meta={meta} />}
      <ParseBlocks content={content} meta={meta} />
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
      <DynamicSidebar layout="modern" />
      <GalleryPopupDMH slides={slides} />
    </>
  );
}

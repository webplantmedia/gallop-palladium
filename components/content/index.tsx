import EditLink from '@components/edit-link';
import { ParseBlocks } from '@components/blocks';
import { parseContent } from './parse-content';
import { GalleryPopup } from '@components/lightbox/gallery-popup';
import { captureMediaElements } from '@components/content/capture-media-elements';

export default function Content({ post, meta = {} }) {
  let toc: any = [];
  let hasH1: boolean;
  let content: string;

  ({ content, toc, hasH1 } = parseContent(post.postContent));

  let article = (
    <article className="main-content">
      <ParseBlocks content={content} meta={meta} />
      <div className="fixed bottom-5 right-5 z-40 flex gap-2 !px-0">
        <EditLink meta={meta} />
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

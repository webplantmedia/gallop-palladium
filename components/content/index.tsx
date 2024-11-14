import EditLink from '@components/edit-link';
import { ParseBlocks } from '@components/blocks';
import { parseContent } from './parse-content';
import { GalleryPopup } from '@components/lightbox/gallery-popup';
import { captureMediaElements } from '@components/content/capture-media-elements';
import H1 from '@components/h-1';

interface Props {
  post?: any;
  meta?: any;
  sidebarHeader?: any;
}

export default function Content({ post, meta = {}, sidebarHeader }: Props) {
  let toc: any = [];
  let hasH1: boolean;
  let content: string;

  ({ content, toc, hasH1 } = parseContent(post?.postContent));

  let article = (
    <article className="main-content">
      {!hasH1 && <H1 title={post?.postTitle} />}
      {content && typeof content === 'string' && (
        <ParseBlocks
          content={content}
          meta={meta}
          sidebarHeader={sidebarHeader}
        />
      )}
      <div className="fixed bottom-5 right-5 z-40 flex gap-2 !px-0">
        <EditLink meta={meta} />
      </div>
    </article>
  );

  let { slides } = captureMediaElements(content);

  return (
    <>
      {article}
      <GalleryPopup />
    </>
  );
}

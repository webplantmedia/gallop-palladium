import classNames from 'classnames';
// import Image from 'next/image';
import {
  CoreImage,
  CoreGallery,
  coreImage,
  coreGallery,
} from '@components/blocks';
import { GallopAlbumCoverToggle } from './gallop-album-cover-toggle';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const GallopAlbumCover = ({ node, className, options, props }: any) => {
  let albumImage = <></>;
  let albumHeading = '';
  let albumHeadingClass = '';
  let albumGallery = <></>;
  let albumSize = 0;
  let albumOpen =
    props['data-album-open'] && props['data-album-open'] == 'true'
      ? true
      : false;

  node?.map((block: any, index: number) => {
    const props: HTMLAttributeProps = castToHTMLAttributeProps(block.attribs);
    let { className: blockClassName } = props;

    if (block.attribs?.class?.includes('wp-block-image')) {
      const { content, hasCaption, style } = coreImage(block, options);
      albumImage = (
        <CoreImage
          content={content}
          hasCaption={hasCaption}
          style={style}
          className={classNames(className, '!mb-0 [&_img]:!rounded-none')}
        />
      );
    } else if (block.attribs?.class?.includes('wp-block-heading')) {
      albumHeading = block.children[0]['data'];
      albumHeadingClass = blockClassName;
    } else if (block.attribs?.class?.includes('wp-block-gallery')) {
      albumSize = block.children.length;
      const { figure, figureProps, columns, figcaption, hasCaption } =
        coreGallery(block, options, className);
      albumGallery = (
        <CoreGallery
          figure={figure}
          figureProps={figureProps}
          columns={columns}
          figcaption={figcaption}
          hasCaption={hasCaption}
          className={className}
        />
      );
    }
  });
  return (
    <div className={classNames(className, 'mb-7')}>
      <GallopAlbumCoverToggle
        albumOpen={albumOpen}
        albumImage={albumImage}
        albumHeadingClass={albumHeadingClass}
        albumHeading={albumHeading}
        albumSize={albumSize}
        albumGallery={albumGallery}
      />
    </div>
  );
};

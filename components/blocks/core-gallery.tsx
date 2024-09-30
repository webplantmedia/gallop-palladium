import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import { Fragment } from 'react';
import { BlockProps } from '@lib/types';

export const CoreGallery = ({ node, className, tag, options }: BlockProps) => {
  // if (hasClassName('collage-3', block)) {
  // return (
  // <Collage3
  // columns={columns}
  // alignClass={alignClass}
  // html={html}
  // block={block}
  // isCropped={isCropped}
  // />
  // );
  // }

  return (
    <GalleryTag tag={tag} node={node} className={className} options={options} />
  );
};

const getGridGalleryClass = (node: any) => {
  let size: any = [];
  let columns = node.length;
  let totalWidth = 0;
  let totalWidthRatio = 0;

  node.map((block: any, index: number) => {
    let width = 0;
    let height = 0;

    if (block?.children[0]?.children[0]?.attribs?.width) {
      width = Number(block?.children[0]?.children[0]?.attribs?.width);
      height = Number(block?.children[0]?.children[0]?.attribs?.height);
    } else if (block?.children[0]?.attribs?.width) {
      width = Number(block?.children[0]?.attribs?.width);
      height = Number(block?.children[0]?.attribs?.height);
    }

    if (width) {
      totalWidth += width;
      let widthRatio = width / (height / 100);
      totalWidthRatio += widthRatio;
      size.push({ widthRatio: widthRatio, width: width, height: height });
    }
  });

  let reducer = (100 - 1.5 * Number(columns - 1)) / 100;
  // console.log(reducer);

  let gridTemplateColumns = size.map((s: any, index: number) => {
    let widthPercentage = (reducer * s.widthRatio) / totalWidthRatio;
    return (widthPercentage * 100).toFixed(4) + '%';
  });

  return {
    gridGalleryClass: 'grid gap-x-[1.5%] pb-[1.5%]',
    gridTemplateColumns: gridTemplateColumns.join(' '),
  };
};

const GalleryTag = ({ node, className, tag, options }: BlockProps) => {
  let match = className.match(/columns-(\d)/);
  let columns = 3;
  let figcaption: any = null;
  if (match && match[1]) {
    columns = Number(match[1]);
  }
  let caption: any = [];
  let figure: any = [];
  node.children.map((block: any, index: number) => {
    if (block.name === 'figure') {
      figure.push(block);
    } else if (block.name === 'figcaption' && block.children) {
      block.children.map((el: any, index: number) => {
        caption.push(el);
      });
    }
  });

  let gallerySize = figure.length;

  if (caption.length) {
    figcaption = (
      <figcaption
        className={classNames(
          'text-left text-sm italic px-3 py-3 bg-white/20 rounded-md w-full dmh:bg-gray-100'
        )}
      >
        {domToReact(caption as DOMNode[], options)}
      </figcaption>
    );
  }

  // className = className.replace('columns-1', 'columns-1');
  // className = className.replace('columns-2', 'columns-1 md:columns-2');
  // className = className.replace(
  // 'columns-3',
  // 'columns-1 md:columns-2 xl:columns-3'
  // );
  // className = className.replace(
  // 'columns-4',
  // 'columns-2 md:columns-2 xl:columns-4 [&>figure>figcaption]:hidden'
  // );
  // className = className.replace(
  // 'columns-5',
  // 'columns-2 md:columns-3 xl:columns-5 [&>figure>figcaption]:hidden'
  // );
  // className = className.replace(
  // 'columns-6',
  // 'columns-2 md:columns-3 xl:columns-6 [&>figure>figcaption]:hidden'
  // );
  // className = className.replace('is-layout-flex', 'gap-3');
  if (1 === columns) {
    className = className.replace(
      'columns-1',
      'grid grid-cols-1 gap-7 justify-center'
    );
    return (
      <Fragment>
        <div className={classNames(className, 'mb-7 items-start')}>
          {figure && domToReact(figure as DOMNode[], options)}
        </div>
        {figcaption && figcaption}
      </Fragment>
    );
  } else if (2 === columns) {
    className = className.replace(
      'columns-2',
      'grid grid-cols-1 md:grid-cols-2 gap-7 justify-center'
    );
    return (
      <Fragment>
        <div className={classNames(className, 'mb-7 items-start')}>
          {figure && domToReact(figure as DOMNode[], options)}
        </div>
        {figcaption && figcaption}
      </Fragment>
    );
  } else if (gallerySize === columns) {
    // console.log(gridTemplateColumns);
    let { gridTemplateColumns, gridGalleryClass } = getGridGalleryClass(figure);

    className = className.replace('gap-3', '');

    return (
      <Fragment>
        <div
          className={classNames(
            className,
            'mb-7 items-start [&>figure>figcaption]:hidden !columns-auto',
            gridGalleryClass
          )}
          style={{ gridTemplateColumns: gridTemplateColumns }}
        >
          {figure && domToReact(figure as DOMNode[], options)}
        </div>
        {figcaption && figcaption}
      </Fragment>
    );
  }

  // number of images in gallery
  let figureLength = figure.length;
  let a = 0;
  let row = 1;
  let imageNumber = 0;
  let firstImageInRow = 0;
  // remainder of images when divided by number of columns
  let overflow = columns - (figureLength % columns);

  if (className.includes('is-style-lead-image')) {
    var first = figure.shift();
    figureLength = figure.length;
    overflow = columns - (figureLength % columns);
    return (
      <div className={classNames(className, 'mb-7 items-start !columns-auto')}>
        <div
          key={'album-image-lead'}
          className={classNames(
            '[&>figure>figcaption]:hidden grid gap-x-[1.5%] pb-[1.5%]'
          )}
          style={{ gridTemplateColumns: '100%' }}
        >
          {first && domToReact([first] as DOMNode[], options)}
        </div>
        {figure.map((block: any, index: number) => {
          imageNumber = index + 1;
          // console.log(row + ' <= ' + overflow);

          // Should the first few rows be fewer columns than the default columns?
          // Let's check. But make sure we are not dealing with an exact 2 row gallery
          // Or an exact single row gallery.
          // If so, this algorithm might try to do 3|3|2 instead of 4|4.
          const maxColumns =
            row <= overflow &&
            columns * 2 !== figureLength &&
            columns !== figureLength
              ? columns - 1
              : columns;

          // console.log(maxColumns);

          // if we reached the number of max columns in a row of images,
          // or are at the last image of a row, let's display all the row images.
          // Otherwise, keep increasing imageNumber which will add more images to a row.
          if (
            figureLength <= imageNumber ||
            imageNumber - firstImageInRow >= maxColumns
          ) {
            const n = figure.slice(a, imageNumber);
            a = imageNumber;
            row = row + 1;
            firstImageInRow = imageNumber;
            let { gridTemplateColumns, gridGalleryClass } =
              getGridGalleryClass(n);
            return (
              <div
                key={'album-image-' + imageNumber}
                className={classNames(
                  '[&>figure>figcaption]:hidden',
                  gridGalleryClass
                )}
                style={{ gridTemplateColumns: gridTemplateColumns }}
              >
                {n && domToReact(n as DOMNode[], options)}
              </div>
            );
          }
        })}
        {figcaption && figcaption}
      </div>
    );
  }

  return (
    <div className={classNames(className, 'mb-7 items-start !columns-auto')}>
      {figure.map((block: any, index: number) => {
        imageNumber = index + 1;
        // console.log(row + ' <= ' + overflow);

        // Should the first few rows be fewer columns than the default columns?
        // Let's check. But make sure we are not dealing with an exact 2 row gallery
        // Or an exact single row gallery.
        // If so, this algorithm might try to do 3|3|2 instead of 4|4.
        const maxColumns =
          row <= overflow &&
          columns * 2 !== figureLength &&
          columns !== figureLength
            ? columns - 1
            : columns;

        // if we reached the number of max columns in a row of images,
        // or are at the last image of a row, let's display all the row images.
        // Otherwise, keep increasing imageNumber which will add more images to a row.
        if (
          figureLength <= imageNumber ||
          imageNumber - firstImageInRow >= maxColumns
        ) {
          const n = figure.slice(a, imageNumber);
          a = imageNumber;
          row = row + 1;
          firstImageInRow = imageNumber;
          let { gridTemplateColumns, gridGalleryClass } =
            getGridGalleryClass(n);
          return (
            <div
              key={'album-image-' + imageNumber}
              className={classNames(
                '[&>figure>figcaption]:hidden',
                gridGalleryClass
              )}
              style={{ gridTemplateColumns: gridTemplateColumns }}
            >
              {n && domToReact(n as DOMNode[], options)}
            </div>
          );
        }
      })}
      {figcaption && figcaption}
    </div>
  );

  // return (
  // <div
  // className={classNames(
  // className,
  // 'mb-7 items-start [&>figure>figcaption]:hidden !columns-auto'
  // )}
  // >
  // {node && domToReact(node as DOMNode[], options)}
  // </div>
  // );
};

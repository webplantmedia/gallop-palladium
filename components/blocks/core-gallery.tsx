import classNames from 'classnames';
import { Fragment } from 'react';
import { BlockProps } from '@lib/types';
import Link from 'next/link';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { HTMLAttributeProps } from '@lib/types';
import { replaceWordPressUrl, castToHTMLAttributeProps } from '@utils/tools';

interface GalleryVars {
  figure: any;
  figureLength: any;
  imageNumber: any;
  className: any;
  overflow: any;
  columns: any;
  firstImageInRow: any;
  figureProps: any;
  figcaption: any;
  a: any;
  row: any;
}

const getGridGalleryClass = (node: any) => {
  let size: any = [];
  let columns = node.length;
  let totalWidth = 0;
  let totalWidthRatio = 0;

  node.map((item: any, index: number) => {
    let width = 0;
    let height = 0;

    if (item?.width && item?.height) {
      width = Number(item.width);
      height = Number(item.height);
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

export const CoreGallery = ({ className, data }: BlockProps) => {
  let match = className?.match(/columns-(\d)/);
  let columns = 3;
  if (match && match[1]) {
    columns = Number(match[1]);
  }

  let figure: Array<React.ReactElement> = [];
  let figureProps: Array<Object> = [];
  let figcaption: React.ReactElement | null = null;

  const wpBlockImages = Array.isArray(data?.wpBlockImage)
    ? data.wpBlockImage
    : [data.wpBlockImage];

  wpBlockImages?.map((block: any, index: number) => {
    var className = block.className;
    className = className.replace(
      'alignleft',
      'alignleft md:float-left md:w-[300px] xl:w-auto md:!mr-5 mt-1.5 md:!pr-0'
    );
    className = className.replace(
      'alignright',
      'alignright md:float-right md:w-[300px] xl:w-auto md:!ml-5 mt-1.5 md:!pl-0'
    );
    var href2 = '';
    var hasImageSrcLink = false;

    if (block.a) {
      hasImageSrcLink =
        block.a.href && block.a.href.match(/\.jpe?g$|\.png$/) ? true : false;

      if (hasImageSrcLink) {
        href2 = block.a.href;
      }

      if (!hasImageSrcLink && block.a.href) {
        href2 = replaceWordPressUrl(block.a.href);
      }
    }

    if (block.a?.img) {
      figureProps.push({
        width: block.a.img.width,
        height: block.a.img.height,
      });
    }

    if (block.img) {
      figureProps.push({
        width: block.img.width,
        height: block.img.height,
      });
    }

    figure.push(
      <figure
        key={`figure-${index}`}
        className={classNames(
          'flex flex-col box-border',
          className,
          'break-inside-avoid',
          block.figcaption ? '[&_img]:rounded-t-sm' : '[&_img]:rounded-sm'
        )}
      >
        {block.img && (
          <img
            className={classNames(block.img.className, 'max-w-full box-border')}
            loading="lazy"
            src={block.img.src}
            style={block.img.style}
            width={parseInt(block.img.width)}
            height={parseInt(block.img.height)}
            srcSet={block.img.srcSet}
            sizes={block.img.sizes}
            alt={block.img.alt}
            title={block.img.title}
          />
        )}
        {block.a?.img && (
          <Link
            href={href2}
            prefetch={false}
            {...(block.a.target ? { target: block.a.target } : {})}
            className={classNames(
              'block',
              '[&_img]:!h-auto',
              hasImageSrcLink ? 'lightbox-content' : ''
            )}
          >
            <img
              className={classNames(
                block.a.img.className,
                'max-w-full box-border'
              )}
              loading="lazy"
              src={block.a.img.src}
              style={block.a.img.style}
              width={parseInt(block.a.img.width)}
              height={parseInt(block.a.img.height)}
              srcSet={block.a.img.srcSet}
              sizes={block.a.img.sizes}
              alt={block.a.img.alt}
              title={block.a.img.title}
            />
          </Link>
        )}
        {block.figcaption && (
          <figcaption
            className={classNames(
              block.figcaption.className,
              'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md w-auto'
            )}
          >
            {block.figcaption.jsx}
          </figcaption>
        )}
      </figure>
    );
  });

  if (data.figcaption) {
    figcaption = (
      <figcaption
        className={classNames(
          data.figcaption.className,
          'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md w-auto'
        )}
      >
        {data.figcaption.jsx}
      </figcaption>
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
  // Should the first few rows be fewer columns than the default columns?
  // Let's check. But make sure we are not dealing with an exact 2 row gallery
  // Or an exact single row gallery.
  // If so, this algorithm might try to do 3|3|2 instead of 4|4.

  if (1 === columns) {
    return (
      <div className={classNames(className, 'mb-7 items-start !columns-auto')}>
        <div className="grid grid-cols-1 justify-center gap-7">{figure}</div>
        {figcaption && figcaption}
      </div>
    );
  } else if (2 === columns) {
    return (
      <div className={classNames(className, 'mb-7 items-start !columns-auto')}>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-x-[1.5%] pb-[1.5%]">
          {figure}
        </div>
        {figcaption && figcaption}
      </div>
    );
  } else if (className?.includes('is-style-lead-image')) {
    return (
      <LeadImageGallery
        figure={figure}
        figureLength={figureLength}
        imageNumber={imageNumber}
        className={className}
        overflow={overflow}
        columns={columns}
        firstImageInRow={firstImageInRow}
        figureProps={figureProps}
        figcaption={figcaption}
        a={a}
        row={row}
      />
    );
  }

  return (
    <DefaultGallery
      figure={figure}
      figureLength={figureLength}
      imageNumber={imageNumber}
      className={className}
      overflow={overflow}
      columns={columns}
      firstImageInRow={firstImageInRow}
      figureProps={figureProps}
      figcaption={figcaption}
      a={a}
      row={row}
    />
  );
};

const LeadImageGallery = ({
  figure,
  figureLength,
  imageNumber,
  className,
  overflow,
  columns,
  firstImageInRow,
  figureProps,
  figcaption,
  a,
  row,
}: GalleryVars) => {
  var first = figure.shift();
  var firstProp = figureProps.shift();
  figureLength = figure.length;
  overflow = columns - (figureLength % columns);
  return (
    <div className={classNames(className, 'mb-7 items-start !columns-auto')}>
      <div
        key={'gallery-item-lead'}
        className={classNames(
          '[&>figure>figcaption]:sr-only grid gap-x-[1.5%] pb-[1.5%] [&_img]:w-full'
        )}
        style={{ gridTemplateColumns: '100%' }}
      >
        {first}
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
          const n = figureProps.slice(a, imageNumber);
          // console.log(n);
          const rowGallery = figure.slice(a, imageNumber);
          a = imageNumber;
          row = row + 1;
          firstImageInRow = imageNumber;
          let { gridTemplateColumns, gridGalleryClass } =
            getGridGalleryClass(n);
          return (
            <div
              key={'gallery-item-' + imageNumber}
              className={classNames(
                '[&>figure>figcaption]:sr-only',
                'flex flex-row gap-x-[1.5%] pb-[1.5%]',
                gridGalleryClass
              )}
              style={{ gridTemplateColumns: gridTemplateColumns }}
            >
              {rowGallery}
            </div>
          );
        }
      })}
      {figcaption && figcaption}
    </div>
  );
};

const DefaultGallery = ({
  figure,
  figureLength,
  imageNumber,
  className,
  overflow,
  columns,
  firstImageInRow,
  figureProps,
  figcaption,
  a,
  row,
}: GalleryVars) => {
  return (
    <div className={classNames(className, 'mb-7 items-start !columns-auto')}>
      {figure.map((block: any, index: number) => {
        imageNumber = index + 1;

        const maxColumns =
          row <= overflow &&
          columns * 2 !== figureLength &&
          columns !== figureLength
            ? columns - 1
            : columns;

        // console.log(row + ' <= ' + overflow);

        // if we reached the number of max columns in a row of images,
        // or are at the last image of a row, let's display all the row images.
        // Otherwise, keep increasing imageNumber which will add more images to a row.
        if (
          figureLength <= imageNumber ||
          imageNumber - firstImageInRow >= maxColumns
        ) {
          const n = figureProps.slice(a, imageNumber);
          const rowGallery = figure.slice(a, imageNumber);
          a = imageNumber;
          row = row + 1;
          firstImageInRow = imageNumber;
          let { gridTemplateColumns, gridGalleryClass } =
            getGridGalleryClass(n);
          return (
            <div
              key={'gallery-item-' + imageNumber}
              className={classNames(
                '[&>figure>figcaption]:sr-only',
                'flex flex-row gap-x-[1.5%] pb-[1.5%]',
                gridGalleryClass
              )}
              style={{ gridTemplateColumns: gridTemplateColumns }}
            >
              {rowGallery}
            </div>
          );
        }
      })}
      {figcaption && figcaption}
    </div>
  );
};

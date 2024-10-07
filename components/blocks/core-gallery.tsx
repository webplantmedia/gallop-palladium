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

export const CoreGallery = ({ node, className, tag, options }: BlockProps) => {
  let match = className?.match(/columns-(\d)/);
  let columns = 3;
  if (match && match[1]) {
    columns = Number(match[1]);
  }
  let figure: Array<React.ReactElement> = [];
  let figureProps: Array<Object> = [];
  let figcaption: React.ReactElement | null = null;
  let index: 0;
  let hasCaption = false;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;
        index++;

        if (className?.includes('wp-block-image')) {
          className = className.replace(
            'alignleft',
            'alignleft md:float-left md:w-[300px] xl:w-auto md:!mr-5 mt-1.5 md:!pr-0'
          );
          className = className.replace(
            'alignright',
            'alignright md:float-right md:w-[300px] xl:w-auto md:!ml-5 mt-1.5 md:!pl-0'
          );

          figure.push(
            <figure
              key={`figure-${index}`}
              className={classNames(
                'flex flex-col box-border',
                className,
                'break-inside-avoid',
                hasCaption ? '[&_img]:rounded-t-sm' : '[&_img]:rounded-sm'
              )}
            >
              {domToReact(domNode.children as DOMNode[], op)}
            </figure>
          );
          return <></>;
        } else if (domNode.name === 'figcaption') {
          if (className?.includes('blocks-gallery-caption')) {
            figcaption = (
              <figcaption
                className={classNames(
                  props.className,
                  'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md w-auto'
                )}
              >
                {domToReact(domNode.children as DOMNode[], op)}
              </figcaption>
            );
            return <></>;
          }
          return (
            <figcaption
              className={classNames(
                props.className,
                'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md w-auto'
              )}
            >
              {domToReact(domNode.children as DOMNode[], op)}
            </figcaption>
          );
        } else if (domNode.name === 'img') {
          let { width, height, style, src } = props;

          if (width && height) {
            figureProps.push({ width: width, height: height });

            return (
              <img
                className={classNames(props.className, 'max-w-full box-border')}
                loading="lazy"
                src={props.src}
                style={props.style}
                width={parseInt(props.width)}
                height={parseInt(props.height)}
                srcSet={props.srcSet}
                sizes={props.sizes}
                alt={props.alt}
                title={props.title}
              />
            );
          }
          return <></>;
        } else if (domNode.name === 'figcaption') {
          hasCaption = true;

          return (
            <figcaption
              className={classNames(
                props.className,
                'text-left text-sm italic px-3 py-3 bg-base-card rounded-b-md w-auto'
              )}
            >
              {domToReact(domNode.children as DOMNode[], op)}
            </figcaption>
          );
        } else if (domNode.name === 'a') {
          const { href, target } = props;
          let href2 = href;

          let hasImageSrcLink =
            href && href.match(/\.jpe?g$|\.png$/) ? true : false;

          if (!hasImageSrcLink && href) {
            href2 = replaceWordPressUrl(href);
          }

          return (
            <Link
              href={href2}
              prefetch={false}
              {...(target ? { target } : {})}
              className={classNames(
                'block',
                '[&_img]:!h-auto',
                hasImageSrcLink ? 'lightbox-content' : ''
              )}
            >
              {domToReact(domNode.children as DOMNode[], op)}
            </Link>
          );
        }
      }
    },
  };

  domToReact(node?.children as DOMNode[], op);

  let gallerySize = figure.length;
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
    className = className?.replace(
      'columns-1',
      'grid grid-cols-1 gap-7 justify-center'
    );
    return (
      <Fragment>
        <div className={classNames(className, 'mb-7 items-start')}>
          {figure}
        </div>
        {figcaption && figcaption}
      </Fragment>
    );
  } else if (2 === columns) {
    className = className?.replace(
      'columns-2',
      'grid grid-cols-1 md:grid-cols-2 gap-7 justify-center'
    );
    return (
      <Fragment>
        <div className={classNames(className, 'mb-7 items-start')}>
          {figure}
        </div>
        {figcaption && figcaption}
      </Fragment>
    );
  } else if (gallerySize === columns) {
    // console.log(gridTemplateColumns);
    let { gridTemplateColumns, gridGalleryClass } = getGridGalleryClass(figure);

    className = className?.replace('gap-3', '');

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
          {figure}
        </div>
        {figcaption && figcaption}
      </Fragment>
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
                '[&>figure>figcaption]:hidden',
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

const GalleryTag = ({ node, className, tag, options }: BlockProps) => {
  let match = className?.match(/columns-(\d)/);
  let columns = 3;
  let figcaption: any = null;
  if (match && match[1]) {
    columns = Number(match[1]);
  }
  let caption: any = [];
  let figure: any = [];
  node?.children.map((block: any, index: number) => {
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

  if (1 === columns) {
    className = className?.replace(
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
    className = className?.replace(
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

    className = className?.replace('gap-3', '');

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

  if (className?.includes('is-style-lead-image')) {
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
};

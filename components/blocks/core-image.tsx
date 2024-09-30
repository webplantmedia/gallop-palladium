import {
  permalink,
  getUploadPath,
  getSrcSet,
  replaceWordPressUrl,
} from '@utils/tools';
import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';
import Link from 'next/link';
import { Fragment } from 'react';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import { BlockProps } from '@lib/types';

interface ImageBlockProps extends BlockProps {
  block?: any;
  hasCaption?: string;
  marginClass?: string;
}

const ImageTag = ({
  block,
  tag,
  className,
  options,
  hasCaption,
}: ImageBlockProps) => {
  const props: HTMLAttributeProps = castToHTMLAttributeProps(block.attribs);
  let img = <></>;

  if (block.name == 'img') {
    let caption = block?.next?.children;
    img = (
      <>
        {props.width && props.height && (
          <img
            className={classNames(
              props.className,
              hasCaption ? 'rounded-t-sm' : 'rounded-sm',
              'min-w-full'
            )}
            loading="lazy"
            src={props.src}
            style={props.style}
            width={parseInt(props.width)}
            height={parseInt(props.height)}
            srcSet={props.srcSet}
            sizes={props.sizes}
            // placeholder={`data:image/svg+xml;base64,${toBase64(
            // shimmer(Number(props.width), Number(props.height))
            // )}`}
            alt={props.alt}
            title={props.title}
            // quality={100}
          />
        )}
        {hasCaption && caption && (
          <figcaption
            className={classNames(
              props.className,
              'text-left text-sm italic px-3 py-3 bg-white/20 rounded-b-md w-auto dmh:bg-gray-100'
            )}
          >
            {domToReact(caption as DOMNode[], options)}
          </figcaption>
        )}
      </>
    );
  } else if (block.name == 'a' && block.children[0]) {
    let caption = block.children[0]?.parent?.next?.children;
    const imgProps: HTMLAttributeProps = castToHTMLAttributeProps(
      block.children[0].attribs
    );
    // let z = getSrcSet(imgProps.srcSet);
    let hasImageSrcLink =
      props?.href && props.href.match(/\.jpe?g$|\.png$/) ? true : false;

    if (!hasImageSrcLink && props?.href) {
      props.href = replaceWordPressUrl(props.href);
    }

    img = (
      <>
        <Link
          prefetch={false}
          className={classNames(
            'block',
            hasImageSrcLink ? 'lightbox-content' : ''
          )}
          href={props?.href}
        >
          {imgProps.width && imgProps.height && (
            <img
              className={classNames(
                props.className,
                hasCaption ? 'rounded-t-sm' : 'rounded-sm',
                '!h-auto min-w-full'
              )}
              loading="lazy"
              src={imgProps.src}
              // loading="lazy"
              // sizes="(max-width: 750px) 100vw, 750px"
              style={imgProps.style}
              width={parseInt(imgProps.width)}
              height={parseInt(imgProps.height)}
              srcSet={imgProps.srcSet}
              sizes={imgProps.sizes}
              // placeholder={`data:image/svg+xml;base64,${toBase64(
              // shimmer(Number(imgProps.width), Number(imgProps.height))
              // )}`}
              alt={imgProps.alt}
              title={imgProps.title}
              // quality={100}
            />
          )}
        </Link>
        {hasCaption && caption && (
          <figcaption
            className={classNames(
              imgProps.className,
              'text-left text-sm italic px-3 py-3 bg-white/20 rounded-b-md w-auto dmh:bg-gray-100'
            )}
          >
            {domToReact(caption as DOMNode[], options)}
          </figcaption>
        )}
      </>
    );
  }

  return img;
};

function TailwindCSSClasses(className: string) {
  if (!className) {
    return className;
  }

  className = className.replace(
    'alignleft',
    'alignleft md:float-left w-[150px] md:w-[200px] xl:w-auto md:!mr-5 mt-1.5'
  );
  className = className.replace(
    'alignright',
    'alignright md:float-right w-[150px] md:w-[200px] xl:w-auto md:!ml-5 mt-1.5'
  );

  return className;
}

const ImageBlock = ({
  node,
  tag,
  className,
  options,
  marginClass,
}: ImageBlockProps) => {
  className = TailwindCSSClasses(className || '');

  // node is <figure>
  let hasCaption = false;
  let isGallery = false;

  if (
    node?.children[0]?.next?.name == 'figcaption' &&
    node?.children[0]?.next?.children
  ) {
    hasCaption = true;
    marginClass = 'mb-12';
  }
  if (node?.parent?.name == 'figure') {
    isGallery = true;
    marginClass = 'pb-0';
  }

  let inner = node?.children?.map((block: any, index: number) => {
    return (
      <Fragment key={'image-tag-' + index}>
        <ImageTag
          key={'image-tag-' + index}
          tag={tag}
          block={block}
          className={classNames(className)}
          options={options}
          hasCaption={hasCaption}
        />
      </Fragment>
    );
  });

  return (
    <figure
      className={classNames(
        className,
        marginClass,
        'break-inside-avoid w-full'
      )}
    >
      {inner}
    </figure>
  );
};

export const CoreImage = ({
  node,
  className = '',
  tag = '',
  options,
  marginClass = 'mb-7',
}: ImageBlockProps) => {
  return (
    <ImageBlock
      tag={tag}
      node={node}
      className={className}
      options={options}
      marginClass={marginClass}
    />
  );
};

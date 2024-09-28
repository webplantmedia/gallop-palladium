import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass } from '@utils/tools';
import {
  CoreParagraph,
  CoreHeading,
  CoreGallery,
  CoreSeparator,
  CoreSpacer,
  CoreButtons,
  CoreButton,
  CoreButtonLink,
  CoreQuote,
  CoreList,
  CoreMediaText,
  CoreImage,
  TagAnchor,
  CoreAudio,
  CoreEmbed,
  // GallopAlbumCover,
  // GallopSinglePost,
  // GallopExcerptPost,
  CoreGroup,
  // GallopBlogPosts,
  // GallopMap,
  // GallopNeighborhood,
  // GallopCard,
  // GallopContactForm,
  GallopSidebar,
  GallopSwiper,
} from '@components/blocks';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

function TailwindCSSClasses(className: string) {
  if (!className) {
    return className;
  }

  className = className.replace('has-text-align-', 'text-');
  className = className.replace(
    'aligncenter',
    'aligncenter text-center mx-auto table justify-center table ml-0 mr-0'
  );
  className = className.replace(
    'alignleft',
    'alignleft text-center md:float-left md:mr-10 md:mb-10 table ml-0 mr-0'
  );
  className = className.replace(
    'alignright',
    'alignright text-center md:float-right md:ml-10 md:mb-10 table ml-0 mr-0'
  );
  className = className.replace(
    'alignfull',
    'alignfull mx-auto !max-w-screen-4xl clear-both !px-0'
  );
  className = className.replace(
    'alignwide',
    'alignwide mx-auto !max-w-screen-3xl clear-both'
  );
  className = className.replace(
    'wp-block-image',
    'wp-block-image table [&>figcaption]:table-caption [&>figcaption]:caption-bottom'
  );

  return className;
}

export const ParseBlocks = ({ content, meta }) => {
  if (content === null) {
    return <></>;
  }

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;
        className = TailwindCSSClasses(className);

        if (domNode.name === 'p') {
          return (
            <CoreParagraph className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreParagraph>
          );
        } else if (domNode.name === 'ul') {
          return (
            <CoreList
              tag={domNode.name}
              className={className}
              node={domNode.children}
              options={options}
            />
          );
        } else if (domNode.name === 'hr') {
          return <CoreSeparator props={props} />;
        } else if (className?.includes('wp-block-spacer')) {
          return <CoreSpacer props={props} className={className} />;
        } else if (className?.includes('wp-block-heading')) {
          return (
            <CoreHeading tag={domNode.name} className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreHeading>
          );
        } else if (hasExactClass(className, 'wp-block-group')) {
          return (
            <CoreGroup
              className={className}
              props={props}
              options={options}
              node={domNode}
            />
          );
        } else if (className?.includes('wp-block-buttons')) {
          return (
            <CoreButtons tag={domNode.name} className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButtons>
          );
        } else if (className?.includes('wp-block-button__link')) {
          return (
            <CoreButtonLink
              tag={domNode.name}
              className={className}
              node={domNode}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButtonLink>
          );
        } else if (domNode.name === 'a') {
          return (
            <TagAnchor tag={domNode.name} className={className} node={domNode}>
              {domToReact(domNode.children as DOMNode[], options)}
            </TagAnchor>
          );
        } else if (className?.includes('wp-block-button')) {
          return (
            <CoreButton className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButton>
          );
        } else if (className?.includes('wp-block-quote')) {
          return (
            <CoreQuote
              tag={domNode.name}
              props={props}
              className={className}
              node={domNode.children}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallery')) {
          return (
            <CoreGallery
              tag={domNode.name}
              className={className}
              node={domNode.children}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-image')) {
          return (
            <CoreImage
              tag={domNode.name}
              className={className}
              node={domNode}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-media-text')) {
          return (
            <CoreMediaText
              tag={domNode.name}
              className={className}
              node={domNode.children}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-audio')) {
          return (
            <CoreAudio
              tag={domNode.name}
              className={className}
              node={domNode.children}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-embed')) {
          return (
            <CoreEmbed
              tag={domNode.name}
              className={className}
              node={domNode.children}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallop-swiper')) {
          return (
            <GallopSwiper
              className={className}
              node={domNode}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallop-sidebar')) {
          return (
            <GallopSidebar
              className={className}
              node={domNode}
              options={options}
            />
          );
        }
      }
    },
  };
  const html = parse(content, options);

  return <>{html}</>;
};

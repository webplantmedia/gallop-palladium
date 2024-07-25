import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import {
  CoreParagraph,
  CoreHeading,
  CoreGallery,
  CoreSeparator,
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
  GallopAlbumCover,
  GallopSinglePost,
  GallopExcerptPost,
  GallopEstatePost,
  GallopHomePost,
  GallopGridder,
  GallopBlogPosts,
  GallopMLS,
  GallopMLSSold,
  GallopMLSModern,
  GallopMLSModernRecent,
  GallopMap,
  GallopInstagramPosts,
  GallopNeighborhood,
  GallopCard,
  GallopContactForm,
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
    'alignfull mx-auto !max-w-none clear-both'
  );
  className = className.replace(
    'alignwide',
    'alignwide mx-auto !max-w-5xl clear-both'
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
        } else if (className?.includes('wp-block-gallop-card')) {
          return (
            <GallopCard
              className={className}
              props={props}
              options={options}
              node={domNode.children}
            />
          );
        } else if (className?.includes('wp-block-gallop-neighborhood')) {
          return (
            <GallopNeighborhood
              className={className}
              props={props}
              options={options}
              node={domNode.children}
            />
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
        } else if (className?.includes('wp-block-heading')) {
          return (
            <CoreHeading tag={domNode.name} className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreHeading>
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
            <CoreButton tag={domNode.name} className={className}>
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
        } else if (className?.includes('wp-block-gallop-album-cover')) {
          return (
            <GallopAlbumCover
              className={className}
              node={domNode.children}
              options={options}
              props={props}
            />
          );
        } else if (className?.includes('wp-block-gallop-estate-post')) {
          return (
            <GallopEstatePost
              node={domNode.children}
              className={className}
              id={props?.id}
              props={props}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallop-home-post')) {
          return (
            <GallopHomePost
              node={domNode.children}
              className={className}
              id={props?.id}
              props={props}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallop-excerpt-post')) {
          return (
            <GallopExcerptPost
              node={domNode.children}
              className={className}
              id={props?.id}
              props={props}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallop-single-post')) {
          return (
            <GallopSinglePost className={className} id={props?.id}>
              {domToReact(domNode.children as DOMNode[], options)}
            </GallopSinglePost>
          );
        } else if (className?.includes('wp-block-gallop-gridder')) {
          return (
            <GallopGridder className={className} id={props?.id}>
              {domToReact(domNode.children as DOMNode[], options)}
            </GallopGridder>
          );
        } else if (domNode.name === 'gallop-blog-posts') {
          return <GallopBlogPosts className={className} meta={meta} />;
        } else if (domNode.name === 'gallop-mls-modern-recent') {
          return (
            <GallopMLSModern
              className={className}
              meta={meta}
              props={props}
              sort="recent"
            />
          );
        } else if (domNode.name === 'gallop-mls-modern') {
          return (
            <GallopMLSModern
              className={className}
              meta={meta}
              props={props}
              sort="date"
            />
          );
        } else if (domNode.name === 'gallop-mls-sold') {
          return (
            <GallopMLSSold className={className} meta={meta} props={props} />
          );
        } else if (domNode.name === 'gallop-mls') {
          return <GallopMLS className={className} meta={meta} props={props} />;
        } else if (domNode.name === 'gallop-map') {
          return <GallopMap className={className} meta={meta} props={props} />;
        } else if (className?.includes('wp-block-gallop-instagram-posts')) {
          return (
            <GallopInstagramPosts
              className={className}
              node={domNode.children}
            />
          );
        } else if (className.includes('wp-block-gallop-contact')) {
          return <GallopContactForm source={'contact'} homeUrl={null} />;
        }
      }
    },
  };
  const html = parse(content, options);

  return <>{html}</>;
};

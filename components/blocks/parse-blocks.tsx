import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import {
  tailwindAlignClasses,
  hasExactClass,
  getVarsFromNode,
  getVarsFromNode2,
  replaceWordPressUrlRelative,
} from '@utils/tools';
import {
  CoreParagraph,
  CoreHeading,
  CoreGallery,
  coreGallery,
  CoreSeparator,
  CoreSpacer,
  CoreButtons,
  CoreButton,
  CoreCode,
  CoreButtonLink,
  CoreQuote,
  coreQuote,
  CoreList,
  coreList,
  CoreImage,
  coreImage,
  TagAnchor,
  CoreAudio,
  CoreEmbed,
  CoreCover,
  coreCover,
  // GallopAlbumCover,
  // GallopSinglePost,
  GallopExcerptPost,
  gallopExcerptPost,
  CoreGroup,
  CoreGroupGrid,
  CoreGroupCard1,
  CoreGroupCard2,
  CoreGroupHero1,
  // GallopBlogPosts,
  GallopMap,
  gallopMap,
  // GallopNeighborhood,
  // GallopCard,
  // GallopContactForm,
  GallopSidebar,
  gallopSidebar,
  GallopSwiper,
  coreEmbed,
} from '@components/blocks';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import classNames from 'classnames';

export const ParseBlocks = ({
  content,
  meta,
  sidebarHeader,
}: {
  content: string;
  meta: any;
  sidebarHeader: any;
}) => {
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

        if (domNode.name === 'p') {
          return (
            <CoreParagraph className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreParagraph>
          );
        } else if (domNode.name === 'ul') {
          const { content } = coreList(domNode, options);
          return <CoreList content={content} className={className} />;
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
          if (hasExactClass(className, 'wp-block-group-is-layout-grid')) {
            return (
              <CoreGroupGrid className={className} props={props}>
                {domToReact(domNode.children as DOMNode[], options)}
              </CoreGroupGrid>
            );
          } else if (hasExactClass(className, 'is-style-hero-1')) {
            const data = getVarsFromNode(domNode);
            return <CoreGroupHero1 data={data} className={className} />;
          } else if (hasExactClass(className, 'is-style-card-1')) {
            const data = getVarsFromNode(domNode);
            return (
              <CoreGroupCard1 data={data} className={className} props={props} />
            );
          } else if (hasExactClass(className, 'is-style-card-2')) {
            const data = getVarsFromNode(domNode);
            return (
              <CoreGroupCard2 data={data} className={className} props={props} />
            );
          } else {
            return (
              <CoreGroup className={className} props={props}>
                {domToReact(domNode.children as DOMNode[], options)}
              </CoreGroup>
            );
          }
        } else if (className?.includes('wp-block-buttons')) {
          return (
            <CoreButtons className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButtons>
          );
        } else if (className?.includes('wp-block-button__link')) {
          return (
            <CoreButtonLink className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButtonLink>
          );
        } else if (domNode.name === 'a') {
          return (
            <TagAnchor className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </TagAnchor>
          );
        } else if (className?.includes('wp-block-button')) {
          return (
            <CoreButton options={options} className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButton>
          );
        } else if (className?.includes('wp-block-quote')) {
          const { content } = coreQuote(domNode, options);
          const { id } = props || {};
          return <CoreQuote content={content} className={className} id={id} />;
        } else if (className?.includes('wp-block-gallery')) {
          const { figure, figureProps, columns, figcaption, hasCaption } =
            coreGallery(domNode, options, className);
          return (
            <CoreGallery
              figure={figure}
              figureProps={figureProps}
              columns={columns}
              figcaption={figcaption}
              hasCaption={hasCaption}
              className={className}
            />
          );
        } else if (className?.includes('wp-block-image')) {
          const { content, hasCaption, style } = coreImage(domNode, options);
          return (
            <CoreImage
              content={content}
              hasCaption={hasCaption}
              style={style}
              className={className}
            />
          );
        } else if (className?.includes('wp-block-audio')) {
          return <CoreAudio props={props} className={className} />;
        } else if (className?.includes('wp-block-cover')) {
          const test = getVarsFromNode2(domNode);
          console.log(test);
          const data = coreCover(domNode, options);
          return <CoreCover data={data} className={className} />;
        } else if (className?.includes('wp-block-embed')) {
          const { videoProps, wrapper, figcaption } = coreEmbed(
            domNode,
            options
          );
          return (
            <CoreEmbed
              videoProps={videoProps}
              figcaption={figcaption}
              wrapper={wrapper}
              className={className}
            />
          );
        } else if (className?.includes('wp-block-gallop-swiper')) {
          return (
            <GallopSwiper className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </GallopSwiper>
          );
        } else if (className?.includes('wp-block-gallop-sidebar')) {
          const { header, content } = gallopSidebar(domNode, options);

          return (
            <GallopSidebar
              className={className}
              header={header}
              sidebarHeader={sidebarHeader}
              content={content}
            />
          );
        } else if (className?.includes('wp-block-gallop-map')) {
          const { address, heading, description, image } = gallopMap(
            domNode,
            options
          );
          return (
            <GallopMap
              address={address}
              heading={heading}
              description={description}
              image={image}
              className={className}
            />
          );
        } else if (className?.includes('wp-block-gallop-excerpt-post')) {
          const { id } = props || {};

          const { heading, paragraph, figure, href, hasTextLink } =
            gallopExcerptPost(domNode, options);

          return (
            <GallopExcerptPost
              className={className}
              heading={heading}
              paragraph={paragraph}
              figure={figure}
              href={href}
              hasTextLink={hasTextLink}
              id={id}
            />
          );
        } else if (className?.includes('wp-block-code')) {
          return (
            <CoreCode className={className}>
              {domToReact(domNode?.children as DOMNode[], options)}
            </CoreCode>
          );
        }
      }
    },
  };
  const html = parse(content, options);

  return <>{html}</>;
};

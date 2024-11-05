import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import {
  tailwindAlignClasses,
  tailwindGetAlignClasses,
  hasExactClass,
  getVarsFromNode,
  replaceWordPressUrlRelative,
} from '@utils/tools';
import {
  CoreParagraph,
  CoreHeading,
  CoreGallery,
  CoreSeparator,
  CoreSpacer,
  CoreButtons,
  CoreButton,
  CoreCode,
  CoreButtonLink,
  CoreQuote,
  CoreList,
  CoreImage,
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
  // GallopNeighborhood,
  // GallopCard,
  // GallopContactForm,
  GallopSidebar,
  gallopSidebar,
  GallopSwiper,
} from '@components/blocks';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';
import classNames from 'classnames';

export const ParseBlocks = ({
  content,
  meta,
  sidebarHeader,
}: {
  content: any;
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
          className = tailwindAlignClasses(className);
          return (
            <CoreParagraph className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreParagraph>
          );
        } else if (domNode.name === 'ul') {
          className = tailwindAlignClasses(className);
          const data = getVarsFromNode(domNode);
          return <CoreList data={data} className={className} />;
        } else if (domNode.name === 'hr') {
          className = tailwindAlignClasses(className);
          return <CoreSeparator props={props} />;
        } else if (className?.includes('wp-block-spacer')) {
          className = tailwindAlignClasses(className);
          return <CoreSpacer props={props} className={className} />;
        } else if (className?.includes('wp-block-heading')) {
          className = tailwindAlignClasses(className);
          return (
            <CoreHeading tag={domNode.name} className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreHeading>
          );
        } else if (hasExactClass(className, 'wp-block-group')) {
          className = tailwindAlignClasses(className);
          if (hasExactClass(className, 'wp-block-group-is-layout-grid')) {
            return (
              <CoreGroupGrid className={className} props={props}>
                {domToReact(domNode.children as DOMNode[], options)}
              </CoreGroupGrid>
            );
          } else if (hasExactClass(className, 'is-style-hero-1')) {
            const data = getVarsFromNode(domNode);
            return (
              <CoreGroupHero1 data={data} className={className} props={props} />
            );
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
          className = tailwindAlignClasses(className);
          return (
            <CoreButtons className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButtons>
          );
        } else if (className?.includes('wp-block-button__link')) {
          className = tailwindAlignClasses(className);
          return (
            <CoreButtonLink className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButtonLink>
          );
        } else if (domNode.name === 'a') {
          className = tailwindAlignClasses(className);
          return (
            <TagAnchor className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </TagAnchor>
          );
        } else if (className?.includes('wp-block-button')) {
          className = tailwindAlignClasses(className);
          return (
            <CoreButton options={options} className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreButton>
          );
        } else if (className?.includes('wp-block-quote')) {
          className = tailwindAlignClasses(className);
          const data = getVarsFromNode(domNode);
          return <CoreQuote data={data} props={props} className={className} />;
        } else if (className?.includes('wp-block-gallery')) {
          className = tailwindAlignClasses(className);
          const data = getVarsFromNode(domNode);
          return <CoreGallery data={data} className={className} />;
        } else if (className?.includes('wp-block-image')) {
          className = tailwindAlignClasses(className);
          const data = getVarsFromNode(domNode);
          return <CoreImage className={className} data={data} />;
        } else if (className?.includes('wp-block-audio')) {
          className = tailwindAlignClasses(className);
          return <CoreAudio props={props} className={className} />;
        } else if (className?.includes('wp-block-cover')) {
          const { img, content } = coreCover(domNode, options);
          return (
            <CoreCover className={className} img={img} content={content} />
          );
        } /*else if (className?.includes('wp-block-embed')) {
          className = tailwindAlignClasses(className);
          return (
            <CoreEmbed
              tag={domNode.name}
              className={className}
              node={domNode}
              options={options}
            />
          );
				}*/ else if (className?.includes('wp-block-gallop-swiper')) {
          className = tailwindAlignClasses(className);
          return (
            <GallopSwiper className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </GallopSwiper>
          );
        } else if (className?.includes('wp-block-gallop-sidebar')) {
          className = tailwindAlignClasses(className);
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
          const data = getVarsFromNode(domNode);
          return <GallopMap data={data} className={className} />;
        } else if (className?.includes('wp-block-gallop-excerpt-post')) {
          className = tailwindAlignClasses(className);

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
        } /*else if (className?.includes('wp-block-code')) {
          return (
            <CoreCode
              node={domNode}
              className={className}
              props={props}
              options={options}
            />
          );
				}*/
      }
    },
  };
  const html = parse(content, options);

  return <>{html}</>;
};

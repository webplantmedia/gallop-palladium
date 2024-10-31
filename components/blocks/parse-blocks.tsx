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
  CoreListLi,
  CoreImage,
  TagAnchor,
  CoreAudio,
  CoreEmbed,
  CoreCover,
  // GallopAlbumCover,
  // GallopSinglePost,
  GallopExcerptPost,
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
  GallopSwiper,
} from '@components/blocks';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

import { BlockProps } from '@lib/types';

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
          return (
            <CoreCover
              className={className}
              props={props}
              node={domNode}
              options={options}
            />
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
        } else if (className?.includes('wp-block-gallop-swiper')) {
          className = tailwindAlignClasses(className);
          return (
            <GallopSwiper
              className={className}
              node={domNode}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallop-sidebar')) {
          className = tailwindAlignClasses(className);
          return (
            <GallopSidebar
              className={className}
              node={domNode}
              options={options}
              sidebarHeader={sidebarHeader}
            />
          );
        } else if (className?.includes('wp-block-gallop-map')) {
          return (
            <GallopMap
              node={domNode}
              className={className}
              props={props}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-gallop-excerpt-post')) {
          className = tailwindAlignClasses(className);
          return (
            <GallopExcerptPost
              node={domNode}
              className={className}
              props={props}
              options={options}
            />
          );
        } else if (className?.includes('wp-block-code')) {
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

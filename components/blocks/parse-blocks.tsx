import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass } from '@utils/tools';
import {
  gallopMilestone,
  gallopMilestones,
  CoreParagraph,
  CoreHeading,
  coreGallery,
  CoreSeparator,
  CoreSpacer,
  CoreButtons,
  CoreButton,
  CoreCode,
  CoreButtonLink,
  coreQuote,
  coreList,
  coreImage,
  TagAnchor,
  CoreAudio,
  coreCover,
  // GallopAlbumCover,
  // GallopSinglePost,
  gallopExcerptPost,
  coreGroup,
  // GallopBlogPosts,
  gallopMap,
  // GallopNeighborhood,
  // GallopCard,
  // GallopContactForm,
  gallopSidebar,
  GallopSwiper,
  coreEmbed,
} from '@components/blocks';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

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
        const parentTag = (domNode?.parent as Element)?.name;

        if (domNode.name === 'p') {
          return (
            <CoreParagraph className={className} parentTag={parentTag}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreParagraph>
          );
        } else if (domNode.name === 'ul') {
          return coreList(domNode, options, className);
        } else if (domNode.name === 'hr') {
          return <CoreSeparator props={props} />;
        } else if (className?.includes('wp-block-spacer')) {
          return <CoreSpacer props={props} className={className} />;
        } else if (className?.includes('is-style-milestones')) {
          return gallopMilestones(domNode, className);
        } else if (className?.includes('is-style-milestone')) {
          return gallopMilestone(domNode, className);
        } else if (className?.includes('wp-block-heading')) {
          return (
            <CoreHeading
              tag={domNode.name}
              className={className}
              props={props}
              parentTag={parentTag}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </CoreHeading>
          );
        } else if (hasExactClass(className, 'wp-block-group')) {
          return coreGroup(domNode, options, className, props, parentTag);
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
          return coreQuote(domNode, options, props, className);
        } else if (className?.includes('wp-block-gallery')) {
          return coreGallery(domNode, options, className, parentTag);
        } else if (className?.includes('wp-block-image')) {
          return coreImage(domNode, className, parentTag);
        } else if (className?.includes('wp-block-audio')) {
          return <CoreAudio props={props} className={className} />;
        } else if (className?.includes('wp-block-cover')) {
          return coreCover(domNode, options, className);
        } else if (className?.includes('wp-block-embed')) {
          return coreEmbed(domNode, options, className);
        } else if (className?.includes('wp-block-gallop-swiper')) {
          return (
            <GallopSwiper className={className} props={props}>
              {domToReact(domNode.children as DOMNode[], options)}
            </GallopSwiper>
          );
        } else if (className?.includes('wp-block-gallop-sidebar')) {
          return gallopSidebar(domNode, options, className, sidebarHeader);
        } else if (className?.includes('wp-block-gallop-map')) {
          return gallopMap(domNode, options, className);
        } else if (className?.includes('wp-block-gallop-excerpt-post')) {
          gallopExcerptPost(domNode, options, props, className);
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

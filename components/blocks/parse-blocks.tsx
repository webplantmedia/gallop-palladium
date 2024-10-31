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
        } /*else if (className?.includes('wp-block-cover')) {
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
				}*/ else if (className?.includes('wp-block-gallop-swiper')) {
          className = tailwindAlignClasses(className);
          return (
            <GallopSwiper className={className}>
              {domToReact(domNode.children as DOMNode[], options)}
            </GallopSwiper>
          );
        } else if (className?.includes('wp-block-gallop-sidebar')) {
          className = tailwindAlignClasses(className);
          let header: React.ReactElement | null = null;
          let content: React.ReactElement | null = null;

          const op: HTMLReactParserOptions = {
            replace(domNode) {
              if (domNode instanceof Element && domNode.attribs) {
                const props: HTMLAttributeProps = castToHTMLAttributeProps(
                  domNode.attribs
                );
                let { className: classes } = props;

                if (hasExactClass(classes, 'wp-block-group') && !header) {
                  header = (
                    <>{domToReact(domNode.children as DOMNode[], options)}</>
                  );
                } else if (
                  hasExactClass(classes, 'wp-block-group') &&
                  !content
                ) {
                  content = (
                    <>{domToReact(domNode.children as DOMNode[], options)}</>
                  );
                }
                return <></>; //this prevents recursion
              }
            },
          };

          domToReact(domNode?.children as DOMNode[], op);

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
          let heading: any;
          let paragraph: React.ReactElement | null = null;
          let figure: any;
          let href = '';
          let hasTextLink = false;

          const { id } = props || {};

          const op: HTMLReactParserOptions = {
            replace(domNode) {
              if (domNode instanceof Element && domNode.attribs) {
                const props: HTMLAttributeProps = castToHTMLAttributeProps(
                  domNode.attribs
                );
                const { className: classes } = props;

                if (domNode.name === 'a') {
                  const parent = (domNode?.parent as Element)?.name;
                  if (parent === 'p') {
                    hasTextLink = true;
                  } else {
                    ({ href } = props);
                    href = replaceWordPressUrlRelative(href);
                  }
                } else if (classes?.includes('wp-block-image')) {
                  const data = getVarsFromNode(domNode);
                  figure = (
                    <CoreImage
                      className={classNames(
                        className,
                        '!mb-0 [&_img]:!rounded-none'
                      )}
                      data={data}
                    />
                  );
                  return <></>;
                } else if (className?.includes('wp-block-heading')) {
                  heading = (
                    <CoreHeading
                      tag={domNode.name}
                      className={classNames(className, 'p-4 !mb-0 !mt-0')}
                      props={props}
                    >
                      {domToReact(domNode.children as DOMNode[], options)}
                    </CoreHeading>
                  );
                  return <></>;
                } else if (domNode.name == 'p') {
                  if (domNode?.children?.length > 0) {
                    const p = domToReact(domNode.children as DOMNode[], op);
                    if (p) {
                      paragraph = (
                        <CoreParagraph className={classNames(className, 'p-4')}>
                          {p}
                        </CoreParagraph>
                      );
                    }
                  }
                  return <></>;
                }
              }
            },
          };

          domToReact(domNode?.children as DOMNode[], op);

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

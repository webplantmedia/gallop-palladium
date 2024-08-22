import classNames from 'classnames';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import MapOutlineIcon from '@iconify/icons-ion/map-outline';
import ClockIcon from '@iconify/icons-heroicons/clock';
import Iconify from '@components/iconify';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { getVarsFromHTML } from '@utils/tools';
import { replaceWordPressUrlRelative } from '@utils/tools';
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
} from '@components/blocks';

const Column = ({ node, className, options }) => {
  // const data = getVarsFromHTML(node);
  // const heading = data?.h4?.text ? data.h4.text : null;
  // console.log(data);
  // return (
  // <div className="w-full lg:w-1/2 2xl:w-1/4">
  // {heading && <h4>{heading}</h4>}
  // </div>
  // );
};

export default function FooterColumns({ post }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-columns')) {
          const columns = domNode?.children?.length
            ? domNode.children.length
            : 4;
          return (
            <div
              className={classNames(
                'grid gap-20',
                columns === 4 &&
                  'grod-cols-1 sm:grid-cols-2 xl:grid-cols-[3fr_2fr_3fr_2fr]',
                columns === 3 && 'grod-cols-1 sm:grid-cols-2 xl:grid-cols-3'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </div>
          );
        } else if (hasExactClass(className, 'wp-block-column')) {
          return (
            <div className={classNames('')}>
              {domToReact(domNode.children as DOMNode[], options)}
            </div>
          );
        } else if (hasExactClass(className, 'wp-block-image')) {
          return (
            <CoreImage
              tag={domNode.name}
              className={className}
              node={domNode}
              options={options}
            />
          );
        } else if (hasExactClass(className, 'wp-block-heading')) {
          return (
            <h4
              className={classNames(
                className,
                'mb-7 leading-tight text-2xl font-medium text-white'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </h4>
          );
        } else if (domNode.name === 'p') {
          return (
            <p
              className={classNames(
                className,
                'text-white mb-7 leading-normal'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </p>
          );
        } else if (domNode.name === 'a') {
          let href = '#';
          if (props?.href) {
            href = replaceWordPressUrlRelative(props.href);
          }
          return (
            <a href={href}>
              {domToReact(domNode.children as DOMNode[], options)}
            </a>
          );
        } else if (domNode.name === 'li') {
          return (
            <li className="flex gap-x-3 items-start">
              <span className="w-3 shrink-0 mt-[0.45rem]">
                <Iconify
                  className="text-primary-main w-3 h-3"
                  icon={dotMarkIcon}
                />
              </span>
              <span className="text-white">
                {domToReact(domNode.children as DOMNode[], options)}
              </span>
            </li>
          );
        } else if (domNode.name === 'ul') {
          return (
            <ul
              role="list"
              className={classNames(
                className,
                'leading-normal mb-7 flex flex-col gap-2'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </ul>
          );
        }
      }
    },
  };
  const html = parse(post.post_content, options);

  return <div className="pb-20 pt-20">{html}</div>;
}

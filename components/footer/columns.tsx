import classNames from 'classnames';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import lineEndIcon from '@iconify/icons-material-symbols/line-end';
import DevicePhoneMobileIcon from '@iconify/icons-heroicons/device-phone-mobile';
import EnvelopeIcon from '@iconify/icons-heroicons/envelope';
import ChatBubbleBottomCenterTextIcon from '@iconify/icons-heroicons/chat-bubble-bottom-center-text';
import Iconify from '@components/iconify';
import Link from 'next/link';
import LoginDialog from '@components/login';
import {
  hasExactClass,
  castToHTMLAttributeProps,
  replaceWordPressUrlRelative,
  getVarsFromNode,
  styleStringToObject,
} from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { GallopIconText } from '@components/blocks';

export default function FooterColumns({ post }: { post: any }) {
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
                  'grod-cols-1 md:grid-cols-2 xl:grid-cols-[7fr_4fr_5fr_4fr]',
                columns === 3 && 'grod-cols-1 sm:grid-cols-2 xl:grid-cols-3'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </div>
          );
        } else if (hasExactClass(className, 'wp-block-column')) {
          return (
            <div className={classNames('[&>*:last-child]:mb-0')}>
              {domToReact(domNode.children as DOMNode[], options)}
            </div>
          );
        } else if (hasExactClass(className, 'wp-block-image')) {
          const data = getVarsFromNode(domNode);

          var img: any = {};
          if (data?.img) {
            img = { ...data?.img };
          }

          return img ? (
            <img
              className={classNames(
                'max-w-full w-[300px] mb-7 mx-auto sm:mx-0'
              )}
              loading="lazy"
              style={styleStringToObject(img.style)}
              src={img.src}
              srcSet={img.srcset}
              // sizes={img.sizes}
              width={img.width}
              height={img.height}
              alt={img.alt}
              title={img.title}
            />
          ) : (
            <p>No Image</p>
          );
        } else if (hasExactClass(className, 'is-style-site-info')) {
          return (
            <div
              className={classNames(
                'flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between [&>*]:mb-0'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </div>
          );
        } else if (hasExactClass(className, 'is-style-icon-text')) {
          const data = getVarsFromNode(domNode);
          return (
            <GallopIconText
              data={data}
              className={classNames(
                'text-white mb-3 hover:underline',
                classNames
              )}
            />
          );
        } else if (hasExactClass(className, 'wp-block-heading')) {
          return (
            <h4
              className={classNames(
                className,
                'mb-7 leading-tight text-3xl font-medium text-white'
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
            <Link
              scroll={false}
              prefetch={true}
              href={href}
              className="hover:underline"
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </Link>
          );
        } else if (domNode.name === 'hr') {
          return <hr className="border-white border mt-20 mb-20" />;
        } else if (domNode.name === 'li') {
          return (
            <li className="text-white">
              {domToReact(domNode.children as DOMNode[], options)}
            </li>
          );
        } else if (domNode.name === 'ul') {
          return (
            <ul
              role="list"
              className={classNames(
                className,
                'leading-normal flex flex-col gap-3'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </ul>
          );
        } else if (domNode.name === 'pre') {
          const data = getVarsFromNode(domNode);
          const code = data?.code?.text ? data.code.text : 'no-code';
          if (code === 'login') {
            return <LoginDialog />;
          }
        }
      }
    },
  };
  const html = parse(post.postContent, options);

  return <div className="pb-20 pt-20">{html}</div>;
}

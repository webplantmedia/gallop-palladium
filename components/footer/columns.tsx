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
  getVarsFromHTML,
} from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

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
          const data = getVarsFromHTML(domNode);

          var img: any = {};
          if (data?.img) {
            img = { ...data?.img };
          }

          return img ? (
            <img
              className={classNames(
                className,
                'max-w-full w-[300px] mb-7 mx-auto sm:mx-0'
              )}
              alt={img.alt}
              src={img.src}
              srcSet={img.srcset}
              sizes={img.sizes}
              width={img.width}
              height={img.height}
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
          const data = getVarsFromHTML(domNode);

          const icon = data?.wpBlockCode?.text ? data.wpBlockCode.text : null;
          const label = data?.p?.a?.text ? data.p.a.text : 'Label';
          const href = data?.p?.a?.href ? data.p.a.href : '#';

          let menuIcon = <></>;
          if (icon) {
            switch (icon) {
              case 'icon-mobile':
                menuIcon = (
                  <Iconify
                    icon={DevicePhoneMobileIcon}
                    className="flex-shrink-0 h-6 w-6 mr-2"
                  />
                );
                break;
              case 'icon-email':
                menuIcon = (
                  <Iconify
                    icon={EnvelopeIcon}
                    className="flex-shrink-0 h-6 w-6 mr-2"
                  />
                );
                break;
              case 'icon-chat':
                menuIcon = (
                  <Iconify
                    icon={ChatBubbleBottomCenterTextIcon}
                    className="flex-shrink-0 h-6 w-6 mr-2"
                  />
                );
                break;
            }
          }
          return (
            <Link
              prefetch={false}
              href={replaceWordPressUrlRelative(href)}
              className="text-white flex items-center w-full mb-3 hover:underline"
            >
              {menuIcon && menuIcon}
              {label}
            </Link>
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
            <Link prefetch={false} href={href} className="hover:underline">
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
          const data = getVarsFromHTML(domNode);
          const code = data?.text ? data.text : 'no-code';
          if (code === 'login') {
            return <LoginDialog />;
          }
        }
      }
    },
  };
  const html = parse(post.post_content, options);

  return <div className="pb-20 pt-20">{html}</div>;
}

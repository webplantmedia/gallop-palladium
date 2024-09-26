import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import Link from 'next/link';
import classNames from 'classnames';
import { getVarsFromNode } from '@utils/tools';
import { replaceWordPressUrlRelative } from '@utils/tools';
import MobileMenuLinkDropdown from './mobile-menu-link-dropdown';
import { GallopIconText } from '@components/blocks';

export default function MobileMenuLinks({ menu, closeModal }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'p') {
          const data = getVarsFromNode(domNode);
          const href = data?.a?.href
            ? replaceWordPressUrlRelative(data.a.href)
            : '#';
          return (
            <Link
              prefetch={true}
              href={href}
              onClick={closeModal}
              className={classNames(
                'text-base-contrast border border-base-contrast/20 align-center inline-flex w-full justify-start rounded-md py-3 px-4 bg-base-body cursor-pointer hover:bg-white/30 items-center gap-x-2 dmh:bg-modern-base-card dmh:hover:bg-white/30'
              )}
            >
              {/* Correct way to include the Iconify component */}
              {/*<Iconify
								className="w-5 h-5 shrink-0 mr-2"
								icon={item.icon} // Ensure `item.icon` has the correct Iconify icon identifier
							/>*/}
              <span>{data?.a?.text}</span>
            </Link>
          );
        } else if (hasExactClass(className, 'is-style-icon-text')) {
          return (
            <GallopIconText
              className="border-2 border-primary-main rounded-md px-4 py-3 text-base font-normal bg-primary-main text-primary-contrast shadow-sm hover:bg-primary-light focus:outline-none whitespace-nowrap"
              node={domNode}
            />
          );
        } else if (hasExactClass(className, 'wp-block-group')) {
          const data = getVarsFromNode(domNode);

          return <MobileMenuLinkDropdown data={data} closeModal={closeModal} />;
        } else if (domNode.name === 'hr') {
          return <hr className="border-base-contrast border mt-10 mb-10" />;
        } else if (hasExactClass(className, 'wp-block-heading')) {
          return (
            <h4
              className={classNames(
                className,
                'mb-2 leading-tight text-2xl font-medium text-base-contrast'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </h4>
          );
        }
      }
    },
  };
  const html = parse(menu.postContent, options);

  return <>{html}</>;
}

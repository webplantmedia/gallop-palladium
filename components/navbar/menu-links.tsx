import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import Link from 'next/link';
import classNames from 'classnames';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { getVarsFromNode } from '@utils/tools';
import { replaceWordPressUrlRelative } from '@utils/tools';
import MenuLinkDropdown from './menu-link-dropdown';

export default function MenuLinks({
  isScrolling,
  menu,
}: {
  isScrolling: any;
  menu: any;
}) {
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
              href={href}
              scroll={true}
              prefetch={true}
              className={classNames(
                'inline-flex items-center border-b-2 border-transparent text-base font-normal text-base-contrast hover:border-base-contrast hover:text-base-contrast transition-all'
              )}
            >
              {data?.a?.text}
            </Link>
          );
        } else if (hasExactClass(className, 'wp-block-group')) {
          const data = getVarsFromNode(domNode);

          return <MenuLinkDropdown data={data} isScrolling={isScrolling} />;
        }
      }
    },
  };
  const html = parse(menu.postContent, options);

  return <>{html}</>;
}

import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import classNames from 'classnames';
import { getVarsFromHTML } from '@utils/tools';
import MobileMenuLinkDropdown from './mobile-menu-link-dropdown';
import { DataIconText } from '@components/blocks';
import { DataSeeMore } from '@components/blocks/data-see-more';
import { GallopContactForm } from '@components/blocks/gallop-contact-form';
import { GallopAccordion } from '@components/blocks';

export default function ProfileMenuSidebar({ sidebar, closeModal }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'p') {
          const data = getVarsFromHTML(domNode);
          return <DataSeeMore className={className} data={data} />;
        } else if (domNode.name === 'h2') {
          return (
            <h2
              className={classNames(
                className,
                'leading-tight text-base text-primary-main'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </h2>
          );
        } else if (domNode.name === 'h3') {
          return (
            <h3
              className={classNames(
                className,
                'leading-tight text-2xl text-base-contrast mt-3 mb-5'
              )}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </h3>
          );
        } else if (hasExactClass(className, 'wp-block-image')) {
          const data = getVarsFromHTML(domNode);

          var img: any = {};
          if (data?.img) {
            img = { ...data?.img };
          }

          return img ? (
            <img
              className={classNames(className, 'rounded-sm')}
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
        } else if (hasExactClass(className, 'is-style-accordion')) {
          return <GallopAccordion node={domNode} props={props} />;
        } else if (hasExactClass(className, 'wp-block-group')) {
          const data = getVarsFromHTML(domNode);

          return <MobileMenuLinkDropdown data={data} closeModal={closeModal} />;
        } else if (hasExactClass(className, 'wp-block-code')) {
          const data = getVarsFromHTML(domNode);
          const text = data?.text ? data.text : null;
          switch (text) {
            case 'contact-form':
              return <GallopContactForm />;
          }
        } else if (domNode.name === 'hr') {
          return <hr className="border-base-contrast border mt-10 mb-10" />;
        }
      }
    },
  };
  const html = parse(sidebar.postContent, options);

  return <>{html}</>;
}

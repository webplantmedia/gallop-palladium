import MapOutlineIcon from '@iconify/icons-ion/map-outline';
import ClockIcon from '@iconify/icons-heroicons/clock';
import Iconify from '@components/iconify';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { getVarsFromNode } from '@utils/tools';
import { replaceWordPressUrlRelative } from '@utils/tools';

export default function TopMenuLinks({ menu }: { menu: any }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group')) {
          const data = getVarsFromNode(domNode);
          const icon = data?.pre?.code?.text ? data.pre.code.text : null;
          const label = data?.p?.[0]?.a?.text
            ? data.p[0].a.text
            : data?.p?.a?.text
            ? data.p.a.text
            : 'Label';
          const mobileLabel = data?.p?.[1]?.a?.text
            ? data.p[1].a.text
            : data?.p?.a?.text
            ? data.p.a.text
            : 'Mobile Label';
          const href = data?.p?.[0]?.a?.href
            ? data.p[0].a.href
            : data?.p?.a?.href
            ? data.p.a.href
            : '#';

          let menuIcon = <></>;
          if (icon) {
            switch (icon) {
              case 'icon-map':
                menuIcon = (
                  <Iconify
                    icon={MapOutlineIcon}
                    className="flex-shrink-0 h-6 w-6"
                  />
                );
                break;
              case 'icon-clock':
                menuIcon = (
                  <Iconify icon={ClockIcon} className="flex-shrink-0 h-6 w-6" />
                );
                break;
            }
          }

          return (
            <li className="flex justify-center">
              <a
                className="flex gap-2 items-center"
                href={replaceWordPressUrlRelative(href)}
              >
                {menuIcon && menuIcon}
                <span className="hidden md:block">{label}</span>
                <span className="block md:hidden">{mobileLabel}</span>
              </a>
            </li>
          );
        }

        return <></>;
      }
    },
  };
  const html = parse(menu.postContent, options);

  return <ul className="px-4 lg:px-14 relative flex flex-row gap-8">{html}</ul>;
}

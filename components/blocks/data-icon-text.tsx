import { replaceWordPressUrlRelative } from '@utils/tools';
import DevicePhoneMobileIcon from '@iconify/icons-heroicons/device-phone-mobile';
import EnvelopeIcon from '@iconify/icons-heroicons/envelope';
import ChatBubbleBottomCenterTextIcon from '@iconify/icons-heroicons/chat-bubble-bottom-center-text';
import PhoneChat16Regular from '@iconify/icons-fluent/phone-chat-16-regular';
import Iconify from '@components/iconify';
import Link from 'next/link';
import classNames from 'classnames';

export const DataIconText = ({
  className,
  data,
  onClick,
}: {
  className: any;
  data: any;
  onClick: any;
}) => {
  const icon = data?.pre?.code?.text ? data.pre.code.text : null;
  const label = data?.p?.a?.jsx ? data.p.a.jsx : 'Label';
  const href = data?.p?.a?.href ? data.p.a.href : '/our-team/';

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
          <Iconify icon={EnvelopeIcon} className="flex-shrink-0 h-6 w-6 mr-2" />
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
      case 'icon-text':
        menuIcon = (
          <Iconify
            icon={PhoneChat16Regular}
            className="flex-shrink-0 h-6 w-6 mr-2"
          />
        );
        break;
    }
  }
  return (
    <Link
      prefetch={true}
      scroll={true}
      href={replaceWordPressUrlRelative(href)}
      className={classNames(
        'flex items-center justify-start w-full',
        className
      )}
      onClick={onClick}
    >
      {menuIcon && menuIcon}
      <span>{label}</span>
    </Link>
  );
};

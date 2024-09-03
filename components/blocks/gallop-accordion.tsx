import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { getDomNodeText } from '@utils/tools';
import classNames from 'classnames';
import PersonIcon from '@iconify/icons-carbon/person';
import DotMarkIcon from '@iconify/icons-carbon/dot-mark';
import PhoneIcon from '@iconify/icons-carbon/phone';
import Iconify from '@components/iconify';
import EmailIcon from '@iconify/icons-carbon/email';
import ChatIcon from '@iconify/icons-carbon/chat';
import DevicePhoneMobileIcon from '@iconify/icons-heroicons/device-phone-mobile';
import MapPinIcon from '@iconify/icons-heroicons/map-pin';
import PlayFilledAltIcon from '@iconify/icons-carbon/play-filled-alt';
import EnvelopeIcon from '@iconify/icons-heroicons/envelope';
import ChatBubbleBottomCenterTextIcon from '@iconify/icons-heroicons/chat-bubble-bottom-center-text';
import LogoLinkedin from '@iconify/icons-carbon/logo-linkedin';
import LogoFacebook from '@iconify/icons-carbon/logo-facebook';
import LogoTwitter from '@iconify/icons-carbon/logo-twitter';
import LogoInstagram from '@iconify/icons-carbon/logo-instagram';
import LogoYouTube from '@iconify/icons-carbon/logo-youtube';
import InstagramLogo from '@svg/instagram-logo.svg';

// import Link from 'next/link';
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

export const getGallopAccordionGroup = (node: Element) => {
  let icon = <></>;
  let heading = '';
  let paragraph = '';
  let link = '';
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-code')) {
          const text = getDomNodeText(domNode);
          if (text) {
            switch (text) {
              case 'icon-person':
                icon = (
                  <Iconify
                    icon={PersonIcon}
                    className="flex-shrink-0 h-5 w-5 text-primary-main"
                  />
                );
                break;
              case 'icon-map':
                icon = (
                  <Iconify
                    icon={MapPinIcon}
                    className="flex-shrink-0 h-5 w-5 text-primary-main"
                  />
                );
                break;
              case 'icon-email':
                icon = (
                  <Iconify
                    icon={EnvelopeIcon}
                    className="flex-shrink-0 h-5 w-5 text-primary-main"
                  />
                );
                break;
              case 'icon-phone':
                icon = (
                  <Iconify
                    icon={PhoneIcon}
                    className="flex-shrink-0 h-5 w-5 text-primary-main"
                  />
                );
                break;
              case 'icon-mobile':
                icon = (
                  <Iconify
                    icon={DevicePhoneMobileIcon}
                    className="flex-shrink-0 h-5 w-5 text-primary-main"
                  />
                );
                break;
              case 'icon-dot':
                icon = (
                  <Iconify
                    icon={DotMarkIcon}
                    className="flex-shrink-0 h-3 w-3 text-primary-main"
                  />
                );
                break;
            }
          }
        } else if (hasExactClass(className, 'wp-block-heading')) {
          heading = getDomNodeText(domNode);
        } else if (domNode.name === 'p') {
          paragraph = getDomNodeText(domNode);
        } else if (domNode.name === 'a') {
          const { href } = props;
          link = href;
        }
      }
    },
  };
  domToReact(node.children as DOMNode[], options);

  return { icon, heading, paragraph, link };
};

export const GallopAccordionItem = ({ node, props }) => {
  let icon = <></>;
  let heading = '';
  let paragraph = '';
  let link = '';

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (hasExactClass(className, 'wp-block-group')) {
          ({ icon, heading, paragraph, link } =
            getGallopAccordionGroup(domNode));
          return (
            <div className="flex w-full items-start justify-between gap-4 text-left text-base-contrast text-sm mb-4">
              <div className="w-full flex flex-col">
                <div className="w-full flex flex-row items-center">
                  <div className="shrink-0 w-8">{icon}</div>
                  {link && (
                    <h3 className="text-base w-full">
                      <a className="hover:text-primary-main" href={link}>
                        {heading}
                      </a>
                    </h3>
                  )}
                  {!link && <h3 className="text-base w-full">{heading}</h3>}
                </div>
                {paragraph && (
                  <p className="pl-8 text-base-contrast/50 text-sm italic">
                    {paragraph}
                  </p>
                )}
              </div>
            </div>
          );
        }

        return <></>; //this prevents recursion.
      }
    },
  };
  return <>{domToReact(node.children as DOMNode[], options)}</>;
};

export const GallopAccordion = ({ node, props }) => {
  let content: React.ReactElement | null = null;
  let icon = <></>;
  let heading = '';
  let paragraph = '';

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (!heading && hasExactClass(className, 'wp-block-group')) {
          ({ icon, heading, paragraph } = getGallopAccordionGroup(domNode));
        } else if (!content && hasExactClass(className, 'wp-block-group')) {
          content = <GallopAccordionItem node={domNode} props={props} />;
        }

        return <></>; //this prevents recursion
      }
    },
  };
  domToReact(node.children as DOMNode[], options);

  if (heading && content) {
    return (
      <Disclosure as="div" className="w-full">
        {({ open }) => (
          <>
            <DisclosureButton
              className={classNames(
                open ? '' : '',
                'flex w-full gap-4 items-start justify-between cursor-pointer text-left text-base-contrast mb-4'
              )}
            >
              <div className="flex w-full items-start justify-between gap-4 text-left text-base-contrast text-sm">
                <div className="w-full flex flex-col group">
                  <div className="w-full flex flex-row items-center">
                    <div className="shrink-0 w-8">{icon}</div>
                    <h3 className="text-base w-full group-hover:text-primary-main">
                      {heading}
                    </h3>
                    <ChevronRightIcon
                      className={classNames(
                        open ? 'rotate-90 transform' : '',
                        'transition self-start h-4 w-4 shrink-0'
                      )}
                    />
                  </div>
                  <p className="pl-8 text-base-contrast/50 text-sm italic">
                    {paragraph}
                  </p>
                </div>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="text-base-contrast mb-8">
              {content}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    );
  }

  return <></>;
};

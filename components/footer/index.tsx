import {
  _footerInfo,
  _footerHeading,
  _footerContactHeading,
  _footerContent,
  _footerButtons,
} from '@data/_footer';
import { _cta } from '@data/_sidebar';
import Link from 'next/link';
import LoginDialog from '@components/login';
import FooterColumns from './columns';
import Form from './form';

export default function Footer({ post }) {
  return (
    <footer
      className="w-full bg-secondary-main"
      aria-labelledby="footer-heading"
    >
      <div className="2xl:container mx-auto px-4 sm:px-8">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <FooterColumns post={post} />
        <div className="px-6 pb-8 pt-8">
          <div className="w-full block">
            <div className="text-center w-full mt-20 max-w-6xl mx-auto">
              <h3 className="max-w-[750px] mx-auto w-full flex justify-center leading-tight text-3xl text-primary-main small-caps mt-14 mb-8 dmh:leading-tight dmh:text-3xl dmh:text-modern-secondary-main dmh:normal-case dmh:font-accent dmh:variant-normal dmh:max-w-[950px]">
                {_footerContactHeading}
              </h3>
              <div className="flex flex-col md:flex-row gap-4 w-full mb-24">
                {_cta.map((item: any, itemIndex: number) => (
                  <Link
                    prefetch={false}
                    href={item.href}
                    key={itemIndex}
                    className="gap-x-3 w-full text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 bg-primary-main text-primary-contrast hover:bg-primary-light dmh:bg-modern-primary-main dmh:text-modern-primary-contrast dmh:hover:bg-modern-primary-light"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
              <h3 className="border-b border-base-darker/30 pb-2 w-full flex justify-center leading-tight text-3xl text-primary-main small-caps mt-14 mb-8 dmh:leading-tight dmh:text-3xl dmh:text-modern-secondary-main dmh:normal-case dmh:font-accent dmh:variant-normal">
                {_footerHeading}
              </h3>
              <div className="flex flex-col md:flex-row gap-4 w-full mb-8">
                {_footerButtons.map((item: any, itemIndex: number) => (
                  <Link
                    prefetch={false}
                    href={item.href}
                    key={itemIndex}
                    className="w-full text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 bg-secondary-main text-secondary-contrast hover:bg-secondary-light dmh:bg-modern-primary-main dmh:text-modern-primary-contrast dmh:hover:bg-modern-primary-light"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <p className="mb-8 text-left">{_footerContent}</p>
              <Form />
            </div>
          </div>
          <div
            className="text-center mt-32 max-w-6xl mx-auto"
            dangerouslySetInnerHTML={{ __html: _footerInfo }}
          />
          <LoginDialog />
        </div>
      </div>
    </footer>
  );
}

'use client';

import { _footerNav } from '../_data/_menu';
import {
  _footerInfo,
  _footerHeading,
  _footerContactHeading,
  _footerContent,
  _footerSignup,
  _footerButtons,
} from '@data/_footer';
import { _cta } from '@data/_sidebar';
import Link from 'next/link';
import { useState } from 'react';
import LoginDialog from '@components/login';
import FooterColumns from './columns';

export default function Footer({ post }) {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setMessage(''); // Ensure any previous message is cleared out
    setSubmitted(true);

    const formData = {
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
      email: event.target.emailaddress.value,
    };

    const response = await fetch('/api/subscription/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message);
    setSubmitted(false); // Reset the submission state
  };

  return (
    <footer
      className="w-full bg-secondary-main"
      aria-labelledby="footer-heading"
    >
      <div className="2xl:container mx-auto">
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
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row max-w-full gap-x-4 gap-y-4 md:gap-y-8"
              >
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  className="block text-base w-full rounded-md border-0 py-3 px-5 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50 dmh:border-modern-primary-main dmh:focus:outline-none dmh:focus:ring-0 dmh:focus:border-modern-secondary-main dmh:text-modern-base-contrast dmh:placeholder:text-modern-base-contrast/50 dmh:border-2"
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  className="block text-base w-full rounded-md border-0 py-3 px-5 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50 dmh:border-modern-primary-main dmh:focus:outline-none dmh:focus:ring-0 dmh:focus:border-modern-secondary-main dmh:text-modern-base-contrast dmh:placeholder:text-modern-base-contrast/50 dmh:border-2"
                />
                <input
                  type="email"
                  name="emailaddress"
                  placeholder="Enter your email address"
                  id="emailaddress"
                  className="block text-base w-full rounded-md border-0 py-3 px-3 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50 dmh:border-modern-primary-main dmh:focus:outline-none dmh:focus:ring-0 dmh:focus:border-modern-secondary-main dmh:text-modern-base-contrast dmh:placeholder:text-modern-base-contrast/50 dmh:border-2"
                />
                <button
                  type="submit"
                  className="shrink-0 w-full md:w-[130px] text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 bg-secondary-main text-secondary-contrast hover:bg-secondary-light dmh:bg-modern-primary-main dmh:text-modern-primary-contrast dmh:hover:bg-modern-primary-light"
                >
                  {_footerSignup}
                </button>
              </form>
              {submitted && !message && (
                <p className="w-full border-2 rounded-md py-3 px-5 border-gray-400 bg-gray-100 text-gray-400 text-center mt-4">
                  Loading...
                </p>
              )}
              {message && (
                <p
                  className={`w-full rounded-md py-3 px-5 text-center mt-4 ${
                    message === 'Please fill in all fields.'
                      ? 'border-2 border-yellow-600 bg-yellow-300 text-yellow-600'
                      : message === 'Email is already subscribed.'
                      ? 'border-2 border-blue-600 bg-blue-300 text-blue-600'
                      : message ===
                        'Please check your email to confirm subscription.'
                      ? 'border-2 border-green-600 bg-green-300 text-green-600'
                      : 'border-2 border-red-600 bg-red-300 text-red-600'
                  }`}
                >
                  {message}
                </p>
              )}
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

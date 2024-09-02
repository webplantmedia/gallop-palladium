'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { getDomainFromUrl } from '@utils/tools';

export const GallopContactForm = () => {
  return (
    <Suspense>
      <GallopContactFormInner />
    </Suspense>
  );
};
const GallopContactFormInner = () => {
  const [status, setStatus] = useState('');
  const path = usePathname();
  var search = useSearchParams().toString();

  const [url, setUrl] = useState('');

  useEffect(() => {
    const fullUrl = `${window.location.origin}${path}${
      search ? '?' + search : ''
    }`;
    setUrl(fullUrl);
  }, [path, search]);

  const clearForm = (event: any) => {
    event.target.firstname.value = '';
    event.target.lastname.value = '';
    event.target.emailaddress.value = '';
    event.target.telnumber.value = '';
    event.target.message.value = '';
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = {
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
      email: event.target.emailaddress.value,
      phone: event.target.telnumber.value,
      message: event.target.message.value,
      sourceUrl: url,
      domain: getDomainFromUrl(url),
    };

    const response = await fetch('/api/message/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.message == 'Message sent. Thank You.') {
      clearForm(event);
    }

    setStatus(data.message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-full gap-x-4 gap-y-4 mb-14"
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
        className="block text-base w-full rounded-md border-0 py-3 px-5 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50 dmh:border-modern-primary-main dmh:focus:outline-none dmh:focus:ring-0 dmh:focus:border-modern-secondary-main dmh:text-modern-base-contrast dmh:placeholder:text-modern-base-contrast/50 dmh:border-2"
      />
      <input
        type="tel"
        name="telnumber"
        placeholder="Enter your phone number"
        id="telnumber"
        className="block text-base w-full rounded-md border-0 py-3 px-5 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50 dmh:border-modern-primary-main dmh:focus:outline-none dmh:focus:ring-0 dmh:focus:border-modern-secondary-main dmh:text-modern-base-contrast dmh:placeholder:text-modern-base-contrast/50 dmh:border-2"
      />
      <textarea
        name="message"
        placeholder="Enter your message"
        id="message"
        rows={7}
        className="block text-base w-full rounded-md border-0 py-3 px-5 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50 dmh:border-modern-primary-main dmh:focus:outline-none dmh:focus:ring-0 dmh:focus:border-modern-secondary-main dmh:text-modern-base-contrast dmh:placeholder:text-modern-base-contrast/50 dmh:border-2"
      />
      {status.length > 0 && (
        <p
          className={
            status == 'Message sent. Thank You.'
              ? 'text-[#006400] '
              : 'text-primary-main ' + 'text-base'
          }
        >
          {status}
        </p>
      )}
      <button
        type="submit"
        className="shrink-0 w-full text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 bg-secondary-main text-secondary-contrast hover:bg-secondary-light dmh:bg-modern-primary-main dmh:text-modern-primary-contrast dmh:hover:bg-modern-primary-light"
      >
        Message
      </button>
    </form>
  );
};

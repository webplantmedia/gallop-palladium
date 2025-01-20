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

  const clearForm = (event: any) => {
    event.target.firstname.value = '';
    event.target.lastname.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
    event.target.message.value = '';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    const response = await fetch('/api/message/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.message == 'Message sent. Thank You.') {
      clearForm(e);
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
        autoComplete="given-name"
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
      />
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Last Name"
        autoComplete="family-name"
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email address"
        id="email"
        autoComplete="email"
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Enter your phone number"
        id="phone"
        autoComplete="tel"
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
      />
      <textarea
        name="message"
        placeholder="Enter your message"
        id="message"
        rows={4}
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
      />
      {status.length > 0 && (
        <p
          className={
            (status == 'Message sent. Thank You.'
              ? 'text-primary-main '
              : 'text-[red] ') + 'text-base -mt-2 pb-2'
          }
        >
          {status}
        </p>
      )}
      <button
        type="submit"
        className="block w-full rounded-md bg-accent px-3.5 py-2.5 text-center text-base font-normal text-white shadow-sm hover:bg-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Message
      </button>
    </form>
  );
};

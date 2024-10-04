'use client';

import { useState } from 'react';

export default function Form() {
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
    <>
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
          Submit
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
              : message === 'Please check your email to confirm subscription.'
              ? 'border-2 border-green-600 bg-green-300 text-green-600'
              : 'border-2 border-red-600 bg-red-300 text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
}

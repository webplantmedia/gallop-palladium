'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { state, useSnapshot } from '@state';

export default function LoginDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const snap = useSnapshot(state);

  useEffect(() => {
    const token = localStorage.getItem('wpToken');
    state.isLoggedIn = !!token;
  }, []);

  const loginUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/login/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ username: username, password: password }),
        }
      );

      const json = await response.json();

      if (response.ok && json.success) {
        // Store a simple token indicating the user is logged in
        localStorage.setItem('wpToken', `loggedIn:${json.user_id}`);
        state.isLoggedIn = true;
        setIsOpen(false);
        setErrorMessage('');
      } else {
        // Display the error message directly from the response
        setErrorMessage(json.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  if (snap.isLoggedIn) {
    return (
      <div className="flex justify-start mt-7">
        <button
          onClick={() => {
            localStorage.removeItem('wpToken');
            state.isLoggedIn = false;
          }}
          className="mb-7 leading-tight text-3xl font-medium text-white"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start mt-7">
        <button
          onClick={() => setIsOpen(true)}
          className="mb-7 leading-tight text-3xl font-medium text-white"
        >
          Log In
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-base-darker/25 transition-opacity opacity-100"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-base-card p-7 rounded-lg shadow-lg flex flex-col gap-4 max-w-full w-[500px]">
            <DialogTitle className="mb-7 leading-tight text-3xl font-medium text-base-contrast">
              Login
            </DialogTitle>
            <p>Enter your username and password to log in.</p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block text-base w-full rounded-md border-0 py-3 px-3 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block text-base w-full rounded-md border-0 py-3 px-3 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50"
              />
              <p className="text-sm text-primary-main">
                {errorMessage == 'Incorrect password' ? errorMessage : null}
              </p>
            </div>
            {errorMessage && (
              <p
                className="text-sm text-primary-main"
                dangerouslySetInnerHTML={{ __html: errorMessage }}
              />
            )}
            <button
              onClick={loginUser}
              className="shrink-0 w-full md:w-[130px] text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 bg-secondary-main text-secondary-contrast hover:bg-secondary-light"
            >
              Submit
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}

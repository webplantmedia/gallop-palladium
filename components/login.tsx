'use client';

import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { state, useSnapshot } from '@state';
import { useLoggedIn } from '@hooks';

export default function LoginDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const snap = useSnapshot(state);

  useLoggedIn();

  const loginUser = async () => {
    try {
      const response = await fetch('/api/is-logged-in/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const json = await response.json();
      const { data } = json;
      if (data?.login?.refreshToken) {
        localStorage.setItem('wpToken', data.login.refreshToken);
        state.isLoggedIn = true;
        setIsOpen(false);
        setErrorMessage('');
      }

      if (data) {
        if (data[0]?.message == 'invalid_username') {
          setErrorMessage('Invalid username');
        } else if (data[0]?.message == 'incorrect_password') {
          setErrorMessage('Incorrect password');
        }
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  if (snap.isLoggedIn) {
    return (
      <div className="flex justify-center mt-7">
        <button
          onClick={() => {
            localStorage.removeItem('wpToken');
            state.isLoggedIn = false;
          }}
          className="leading-tight text-2xl text-base-contrast small-caps font-medium dmh:font-accent dmh:normal-case dmh:variant-normal"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center mt-7">
        <button
          onClick={() => setIsOpen(true)}
          className="leading-tight text-2xl text-base-contrast small-caps font-medium dmh:font-accent dmh:normal-case dmh:variant-normal"
        >
          Log In
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-base-darker/25 transition-opacity opacity-100"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-base-card p-7 rounded-lg shadow-lg flex flex-col gap-4">
            <Dialog.Title className="leading-tight text-2xl text-base-contrast small-caps font-medium dmh:font-accent dmh:normal-case dmh:variant-normal">
              Login
            </Dialog.Title>
            <Dialog.Description>
              Enter your username and password to log in.
            </Dialog.Description>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block text-base w-full rounded-md border-0 py-3 px-3 focus:ring-primary-main text-base-contrast shadow-sm placeholder:text-base-contrast/50"
              />
              <p className="text-sm text-primary-main">
                {errorMessage == 'Invalid username' ? errorMessage : null}
              </p>
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
            <button
              onClick={loginUser}
              className="shrink-0 w-full md:w-[130px] text-center rounded-md shadow-sm flex items-center justify-center text-base py-3 px-5 bg-secondary-main text-secondary-contrast hover:bg-secondary-light"
            >
              Submit
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

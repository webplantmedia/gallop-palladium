'use client';

import { useAssistant, useChat } from 'ai/react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState, useRef } from 'react';
import DisableScroll from '../global/disable-scroll';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Iconify from '@components/iconify';
import AIIcon from '@iconify/icons-eos-icons/ai';
import classNames from 'classnames';

function cleanCitation(text) {
  const citationPattern = /\【[^】]*\】/g;
  if (text.length > 0) {
    return text.replace(citationPattern, '');
  } else {
    return;
  }
}

function ChatComponent({ activeIndex, messages, status }) {
  var elements;

  if (activeIndex in messages) {
    elements = messages.map((message, index) => {
      if (message?.role == 'user') {
        return (
          <p className="font-bold" key={index}>
            {message.content}
          </p>
        );
      } else {
        return <p key={index}>{message.content}</p>;
      }
    });
  }

  const userMessages = messages.filter((item) => item.role == 'user');
  const userContent = userMessages[userMessages.length - 1]?.content;

  const aiMessages = messages.filter((item) => item.role == 'assistant');
  const aiContent = aiMessages[aiMessages.length - 1]?.content;

  return (
    <div className="flex flex-col gap-2">
      {activeIndex % 2 != 0 && activeIndex != 0 ? (
        <>
          <p className="font-bold">{userContent}</p>
          <p>{cleanCitation(aiContent)}</p>
        </>
      ) : (
        <>
          <p className="font-bold">{userContent}</p>
          <p>...</p>
        </>
      )}
    </div>
  );
}

export default function Search({ isScrolling }) {
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // UNCOMMENT FOR ASSISTANT
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/assistant' });

  // const { messages, input, handleInputChange, handleSubmit } = useChat(); // UNCOMMENT FOR BASIC GPT-4 MODEL

  let messagesLength = messages.length;
  let activeIndex = messagesLength - 1;

  return (
    <Popover className="flex items-center">
      {({ open }) => (
        <>
          {open && <DisableScroll />}
          <Popover.Button
            as="button"
            id="openai"
            type="button"
            className={classNames(
              open
                ? 'bg-primary-main dmh:bg-modern-primary-contrast text-primary-contrast dmh:text-modern-primary-main'
                : 'bg-transparent text-base-contrast dmh:text-modern-primary-contrast hover:bg-white/30',
              'cursor-pointer flex-shrink-0 rounded-md bg-primary w-[40px] h-[40px] justify-center items-center flex text-base-contrastfocus:outline-none focus:outline-none'
            )}
          >
            <span className="sr-only">Search</span>
            <Iconify className="h-8 w-8" icon={AIIcon} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            unmount={false}
            afterEnter={() => {
              if (searchRef.current !== null) {
                searchRef.current.focus();
              }
            }}
          >
            <Popover.Panel
              static={true}
              className="absolute left-0 right-0 max-w-full top-full"
            >
              <div className="isolate overflow-hidden rounded-b-md shadow-2xl">
                <div
                  className={classNames(
                    isScrolling
                      ? 'max-h-[calc(var(--app-height)-theme(space.24))]'
                      : 'max-h-[calc(var(--app-height)-theme(space.52))]',
                    'overflow-hidden overflow-y-auto scrollbar-hide'
                  )}
                >
                  <div className="relative flex items-center justify-start flex-col h-full">
                    <div className="w-full sticky top-0 z-10">
                      <form
                        className="relative flex items-center"
                        onSubmit={(e) => {
                          setIsLoading(true);
                          submitMessage(e); // CHANGE TO submitMessage(e) FOR ASSISTANT, OR handleSubmit(e) FOR BASIC GPT-4 MODEL
                        }}
                      >
                        <input
                          ref={searchRef}
                          value={status == 'in_progress' ? '' : input}
                          onChange={handleInputChange}
                          onFocus={(e) => e.target.select()}
                          type="search"
                          placeholder="Start chatting with ChatGPT 4.0..."
                          className="appearance-none shadow-inner hide-clear bg-white text-base-contrast font-body block w-full pr-16 pl-6 h-14 border-0 box-border border-white focus:border-white focus:ring-0 placeholder:text-base-contrast/50 truncate text-base outline-none"
                        />
                        <button className="">
                          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-2.5 hover:text-primary-main">
                            <span className="inline-flex items-center text-base-contrast font-body font-normal">
                              <span className="sr-only">Search</span>
                              <MagnifyingGlassIcon
                                className="h-9 w-9 hover:bg-black/20 bg-black/10 text-base-contrast p-1.5 rounded-md"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </button>
                      </form>
                    </div>
                    {isLoading && (
                      <div className="w-full block relative">
                        <ol className="bg-base-body divide-y divide-base-dark dmh:bg-modern-base-card">
                          <li>
                            <div className="flex items-center px-4 py-4 sm:px-6 whitespace-pre-wrap">
                              <ChatComponent
                                activeIndex={activeIndex}
                                messages={messages}
                                status={status}
                              />
                            </div>
                          </li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

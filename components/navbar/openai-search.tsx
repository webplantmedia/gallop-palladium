'use client';

import { useAssistant, useChat } from 'ai/react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState, useRef } from 'react';
import DisableScroll from '../global/disable-scroll';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Iconify from '@components/iconify';
import AIIcon from '@iconify/icons-eos-icons/ai';
import classNames from 'classnames';
import { parse as markedParse } from 'marked';
import {
  castToHTMLAttributeProps,
  compressContent,
  getDomNodeText,
} from '@utils/tools';
import {} from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

function cleanCitation(text: string) {
  const citationPattern = /\【[^】]*\】/g;
  if (text && text.length > 0) {
    return String(text.replace(citationPattern, ''));
  } else {
    return '';
  }
}

function ChatComponent({ activeIndex, messages, status }: any) {
  var elements;

  if (activeIndex in messages) {
    elements = messages.map((message: any, index: number) => {
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

  const userMessages = messages.filter((item: any) => item.role == 'user');
  const userContent = userMessages[userMessages.length - 1]?.content;

  const aiMessages = messages.filter((item: any) => item.role == 'assistant');
  const aiContent = String(aiMessages[aiMessages.length - 1]?.content);
  let aiHtml = String(markedParse(cleanCitation(aiContent))); // returns string prommise. So needed to force string to run other functions on it.
  aiHtml = compressContent(aiHtml);

  return (
    <div className="flex flex-col gap-2 text-base-contrast">
      {activeIndex % 2 != 0 && activeIndex != 0 ? (
        <>
          <p className="font-bold text-primary-main dmh:text-primary-main text-xl">
            {userContent}
          </p>
          <div
            className={classNames(
              '[&>*]:mb-7',
              '[&_a]:underline [&_a]:text-secondary-main [&_a]:dmh:text-modern-primary-main',
              '[&>h2]:font-bold [&>h2]:mt-7 [&>h2]:text-3xl',
              '[&>h3]:font-bold [&>h3]:mt-7 [&>h3]:text-2xl',
              '[&>h4]:font-bold [&>h4]:mt-7 [&>h4]:text-xl',
              '[&>ul]:ml-9 [&>ul]:list-disc',
              '[&>ol]:ml-9 [&>ol]:list-decimal',
              '[&>*:last-child]:mb-0'
            )}
            dangerouslySetInnerHTML={{
              __html: aiHtml,
            }}
          />
        </>
      ) : (
        <>
          <p className="font-bold text-primary-main dmh:text-primary-main text-xl">
            {userContent}
          </p>
          <p className="relative after:content-['...'] h-[30px] after:absolute after:top-0 after:left-0 after:animate-dots"></p>
        </>
      )}
    </div>
  );
}

export default function Search({ isScrolling, post }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  let heading: string = 'Ask A.I.';
  let content: Array<React.ReactElement> = [];
  let instruction: string = 'You are an A.I. assistant';
  var index = -1;

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        index++;
        const props: HTMLAttributeProps = castToHTMLAttributeProps(
          domNode.attribs
        );
        let { className } = props;

        if (domNode.name === 'h2') {
          heading = getDomNodeText(domNode);
          return <></>;
        } else if (domNode.name === 'p') {
          content.push(
            <p
              className="text-base-contrast mb-7 leading-normal [&>a]:text-primary-main hover:[&>a]:text-primary-light"
              key={`content=${index}`}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </p>
          );
          return <></>;
        } else if (domNode.name === 'h3') {
          content.push(
            <h3
              className="mb-1 leading-tight text-2xl md:text-3xl text-primary-main font-medium"
              key={`content=${index}`}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </h3>
          );
          return <></>;
        } else if (domNode.name === 'pre') {
          instruction = getDomNodeText(domNode);
          return <></>;
        }
      }
    },
  };

  parse(post.postContent, options);

  // UNCOMMENT FOR ASSISTANT
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({
      api: '/api/assistant',
      body: {
        instruction,
      },
    });

  // const { messages, input, handleInputChange, handleSubmit } = useChat(); // UNCOMMENT FOR BASIC GPT-4 MODEL

  let messagesLength = messages.length;
  let activeIndex = messagesLength - 1;

  return (
    <Popover className="flex items-center">
      {({ open }: { open: boolean }) => (
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
              className="absolute left-4 right-4 sm:left-8 sm:right-8 max-w-[750px] mx-auto top-full"
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
                          placeholder={heading}
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
                    {isLoading ? (
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
                    ) : (
                      content &&
                      !input && (
                        <div className="w-full block relative">
                          <ol className="bg-base-body divide-y divide-base-dark dmh:bg-modern-base-card">
                            <li>
                              <div className="flex flex-col justify-center px-4 py-4 sm:px-6 whitespace-pre-wrap [&>*:last-child]:!mb-0">
                                {content}
                              </div>
                            </li>
                          </ol>
                        </div>
                      )
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

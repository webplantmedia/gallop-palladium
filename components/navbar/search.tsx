'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import DisableScroll from '../global/disable-scroll';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { castToHTMLAttributeProps, getDomNodeText } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import SearchResults from './search-results';

export default function Search({ isScrolling, post }: any) {
  let [results, setResults] = useState([]);
  let [search, setSearch] = useState('');

  let heading: string = 'Search';
  var index = -1;

  useEffect(() => {
    const init = async () => {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(
        'http://dougnewby-dev.local' + '/wp-json/gallop/v1/posts/',
        {
          headers,
          method: 'POST',
          body: JSON.stringify({
            page: '1',
            search: search,
          }),
        }
      );
      let json = await response.json();
      setResults(json.items);
    };
    init();
  }, [search]);

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
        }
      }
    },
  };

  parse(post.postContent, options);

  return (
    <Popover className="flex items-center">
      {({ open }: { open: boolean }) => (
        <>
          {open && <DisableScroll />}
          <Popover.Button
            as="button"
            type="button"
            className={classNames(
              open
                ? 'bg-primary-main dmh:bg-modern-primary-contrast text-primary-contrast dmh:text-modern-primary-main'
                : 'bg-transparent text-base-contrast dmh:text-modern-primary-contrast hover:bg-white/30',
              'cursor-pointer flex-shrink-0 rounded-md bg-primary flex w-[40px] h-[40px] items-center justify-center text-base-contrast focus:outline-none'
            )}
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute left-4 right-4 sm:left-8 sm:right-8 max-w-[750px] mx-auto top-full">
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
                    <div className="w-full z-10 sticky top-0 relative">
                      <div className="relative flex items-center">
                        <input
                          className="shadow-inner hide-clear bg-white text-base-contrast font-body block w-full border-white pr-16 pl-6 h-14 border-0 box-border border-white focus:border-white focus:ring-0 placeholder:text-base-contrast/50 truncate text-base"
                          autoFocus={true}
                          placeholder={heading}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full block relative">
                    {results.map((item, index) => (
                      <SearchResults result={item} key={index} />
                    ))}
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

'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
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
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [haveMorePosts, setHaveMorePosts] = useState(false);
  const [endCursor, setEndCursor] = useState('');
  const fetchControllerRef = useRef<AbortController | null>(null);

  let heading: string = 'Search';
  var index = -1;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort('New fetch request');
      }
      fetchControllerRef.current = new AbortController();

      try {
        const headers = {
          'Content-Type': 'application/json',
        };

        const response = await fetch(
          process.env.NEXT_PUBLIC_WORDPRESS_URL + '/wp-json/gallop/v1/search/',
          {
            headers,
            method: 'POST',
            body: JSON.stringify({
              page: '1',
              search: search,
            }),
            signal: fetchControllerRef.current.signal,
          }
        );

        if (response.ok) {
          const json = await response.json();
          setResults(json.items);
          const more = Boolean(json?.pageInfo?.hasNextPage);
          const after = json?.pageInfo?.endCursor;
          const total = json?.pageInfo?.totalRows;
          setHaveMorePosts(more);
          setEndCursor(after);
          setTotalCount(total);
          setLoading(false);
        } else {
          console.log('Aborted async request');
          setLoading(false);
        }
      } catch (error) {
        console.log('Error');
      }
    };

    if (search.length > 0) {
      init();
    }
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
                  {loading && results.length > 0 && search.length > 0 && (
                    <div
                      className={classNames(
                        'absolute h-full w-full bg-white z-20 opacity-25'
                      )}
                    ></div>
                  )}
                  <div className="w-full block relative">
                    {search.length > 0 &&
                      results?.map((item, index) => (
                        <SearchResults result={item} key={index} />
                      ))}
                  </div>
                  {search.length > 0 && results.length == 0 && !loading && (
                    <div className="flex items-center px-4 py-4 sm:px-6 justify-center bg-primary-light text-white">
                      No results for <q className="ml-1">{search}</q>.
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

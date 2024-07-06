'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import DisableScroll from '../global/disable-scroll';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import algoliasearch from 'algoliasearch/lite';
import classNames from 'classnames';

import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  useInstantSearch,
} from 'react-instantsearch';
import SearchResults from './search-results';

const algoliaConfig = {
  appId: process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY,
  indexName: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME,
};

function NoResultsBoundary({ children, fallback }) {
  const { results, indexUiState } = useInstantSearch();

  if (indexUiState.query === undefined) {
    return <>{fallback}</>;
  }

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return <>{fallback}</>;
  }

  return children;
}

function NoResults() {
  const { indexUiState } = useInstantSearch();

  if (indexUiState.query === undefined) {
    return <></>;
  }

  return (
    <div className="flex items-center px-4 py-4 sm:px-6 justify-center bg-base-body">
      No results for <q className="ml-1">{indexUiState.query}</q>.
    </div>
  );
}

const algoliaClient = algoliasearch(
  algoliaConfig.appId ?? '',
  algoliaConfig.apiKey ?? ''
);

export default function Search({ isScrolling }) {
  return (
    <Popover className="flex items-center">
      {({ open }) => (
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
            <Popover.Panel className="absolute left-4 right-4 sm:left-8 sm:right-8 max-w-full top-full">
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
                    <InstantSearch
                      searchClient={algoliaClient}
                      indexName={algoliaConfig.indexName}
                    >
                      <SearchBox
                        searchAsYouType={false}
                        autoFocus={true}
                        placeholder="Search Douglas Newby site: Dallas neighborhoods, architects, styles, insights..."
                        classNames={{
                          root: 'w-full z-10 sticky top-0 relative',
                          form: 'relative flex items-center',
                          input:
                            'shadow-inner hide-clear bg-white text-base-contrast font-body block w-full border-white pr-16 pl-6 h-14 border-0 box-border border-white focus:border-white focus:ring-0 placeholder:text-base-contrast/50 truncate text-base',
                        }}
                        submitIconComponent={() => (
                          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-2.5 hover:text-primary-main">
                            <span className="inline-flex items-center text-base-contrast font-body font-normal">
                              <span className="sr-only">Search</span>
                              <MagnifyingGlassIcon
                                className="h-9 w-9 hover:bg-black/20 bg-black/10 text-base-contrast p-1.5 rounded-md"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        )}
                        resetIconComponent={() => <></>}
                      />
                      <div className="w-full block relative">
                        <NoResultsBoundary fallback={<NoResults />}>
                          <InfiniteHits
                            showPrevious={false}
                            classNames={{
                              list: 'bg-base-body divide-y divide-base-dark dmh:bg-modern-base-card',
                              disabledLoadMore: 'hidden',
                              loadMore:
                                'overflow-hidden inline-flex items-center rounded-b-md border border-transparent bg-secondary-main px-5 py-2 font-normal text-center justify-center text-primary-contrast shadow-sm hover:bg-secondary-light focus:outline-none w-full dmh:bg-modern-primary-main dmh:hover:bg-modern-primary-light',
                            }}
                            hitComponent={({ hit }) => (
                              <SearchResults result={hit} />
                            )}
                          />
                        </NoResultsBoundary>
                      </div>
                    </InstantSearch>
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

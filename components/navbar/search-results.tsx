import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from '@heroicons/react/20/solid';
import {
  replaceProductionUrl,
  replaceWordPressUrlRelative,
} from '@utils/tools';
import classNames from 'classnames';
// import Image from 'next/image';

interface Props {
  result: any;
}

export default function SearchResults({ result }: Props) {
  let chipColorClass = '';
  let target = '_self';
  if (result.type == 'neighborhood') {
    chipColorClass = 'text-rose-800 bg-rose-300';
  } else if (result.type == 'page') {
    chipColorClass = 'text-orange-800 bg-orange-300';
  } else if (result.type == 'post') {
    chipColorClass = 'text-amber-800 bg-amber-300';
  } else if (result.type == 'architect') {
    chipColorClass = 'text-green-800 bg-green-300';
  } else if (result.type == 'style') {
    chipColorClass = 'text-blue-800 bg-blue-300';
  } else if (result.type == 'estate') {
    chipColorClass = 'text-violet-800 bg-violet-300';
  } else if (result.type == 'home') {
    chipColorClass = 'text-teal-800 bg-teal-300';
  } else if (result.type == 'blog') {
    chipColorClass = 'text-indigo-800 bg-indigo-300';
    target = '_blank';
  }

  return (
    <a
      href={replaceWordPressUrlRelative(result.href)}
      className="block bg-grey1 hover:bg-grey2 hover:cursor-pointer text-black"
      target={target}
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {result.mediaItemUrl && (
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-sm object-cover object-center"
                src={result.mediaItemUrl[0]}
                alt=""
                width={result.mediaItemUrl[1]}
                height={result.mediaItemUrl[2]}
                // quality={100}
              />
            </div>
          )}
          <div className="min-w-0 pt-2 pr-4 pb-2 flex-1">
            <h3
              className="text-primary-main"
              dangerouslySetInnerHTML={{ __html: result.title }}
            ></h3>
            <span
              className={classNames(
                chipColorClass,
                'inline px-1.5 rounded-md py-0.5 text-sm'
              )}
            >
              {result.type}
            </span>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            className="h-5 w-5 text-primary-main"
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
}

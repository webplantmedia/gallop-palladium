import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from '@heroicons/react/20/solid';
import { replaceProductionUrl } from '@utils/tools';
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
      href={replaceProductionUrl(result.url)}
      className="block bg-primary-light hover:bg-primary-lighter hover:cursor-pointer"
      target={target}
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {result.thumbnail && (
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-sm object-cover object-center"
                src={result.thumbnail}
                alt=""
                width={result.width}
                height={result.height}
                // quality={100}
              />
            </div>
          )}
          <div className="min-w-0 pt-2 pr-4 pb-2 flex-1">
            <h3
              className="text-primary-main dmh:text-modern-base-contrast text-white"
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
            className="h-5 w-5 text-base-contrast"
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
}

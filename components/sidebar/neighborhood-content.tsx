import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { decodeHTMLEntities, stripHTML } from '@utils/tools';

export default function NeighborhoodContent({ data, closeSidebar }) {
  const testImage = data?.featuredImage?.node.mediaDetails.sizes.filter(
    (size) => size.name == 'thumbnail'
  )[0];

  if (testImage) {
    var image = data.featuredImage.node.mediaDetails.sizes.filter((size) =>
      size.name == 'large'
        ? size.name == 'large'
        : size.name == 'medium'
        ? size.name == 'medium'
        : size.name == null
    );
    image = image.length > 0 ? image[0] : null;
  }
  return (
    <div className="w-full relative basis-1/2 pt-4 md:pt-8 flex flex-col h-full gap-3 justify-between">
      <div className="flex flex-col gap-3">
        <Link
          prefetch={false}
          href={`/neighborhood/${data.slug}/`}
          onClick={closeSidebar}
        >
          <strong className="font-normal mt-0 leading-tight text-3xl sm:text-3xl text-primary-main small-caps dmh:text-modern-base-contrast dmh:variant-normal">
            {data.title}
          </strong>
        </Link>
        <Link
          prefetch={false}
          href={`/neighborhood/${data.slug}/`}
          onClick={closeSidebar}
        >
          {image ? (
            <img
              src={image.sourceUrl}
              height={Number(image.height)}
              width={Number(image.width)}
            />
          ) : (
            <img
              src={data?.featuredImage?.node.sourceUrl}
              height={data?.featuredImage?.node.mediaDetails.height}
              width={data?.featuredImage?.node.mediaDetails.width}
            />
          )}
        </Link>

        {data.excerpt ? decodeHTMLEntities(stripHTML(data?.excerpt)) : null}
      </div>
      <Link
        prefetch={false}
        href={`/neighborhood/${data.slug}/`}
        onClick={closeSidebar}
        className="sticky w-full right-0 bottom-0 bg-secondary-main text-secondary-contrast hover:bg-secondary-light text-sm text-center shadow-sm mt-auto dmh:text-modern-primary-contrast dmh:bg-modern-primary-main hover:dmh:bg-modern-primary-light hover:dmh:text-modern-primary-contrast"
      >
        <div className="items-center flex justify-center py-4 px-4">
          Learn More
          <ArrowRightIcon
            className="ml-1 mr-1 h-5 w-5 text-primary-contrast"
            aria-hidden="true"
          />
        </div>
      </Link>
    </div>
  );
}

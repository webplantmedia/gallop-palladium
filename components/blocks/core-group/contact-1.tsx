import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import { Alignment, Container, Heading, Paragraph } from '@components/common';
import { objectMap } from '@utils/objectMap';

export const CoreGroupContact1 = ({ data, className, props }: BlockProps) => {
  let h2 = data?.h2?._jsx || Missing.H2();
  let p = data?.p?._jsx || Missing.Paragraph();
  let quote = data?.wpBlockQuote || Missing.Quote();

  return (
    <Alignment
      as="div"
      align="full"
      className="relative isolate bg-white py-24 sm:py-32"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_bottom_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-64}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <Container className="">
        <Heading as="h2" className="!mt-0">
          {h2}
        </Heading>
        <Paragraph className="">{p}</Paragraph>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form action="#" method="POST" className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-accent px-3.5 py-2.5 text-center text-base font-normal text-white shadow-sm hover:bg-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Let’s talk
              </button>
            </div>
            <p className="mt-4 text-sm/6 text-gray-500">
              By submitting this form, I agree to the{' '}
              <a href="#" className="font-bold text-accent">
                privacy&nbsp;policy
              </a>
              .
            </p>
          </form>
          <div className="lg:mt-6 lg:w-96 lg:flex-none">
            <figure className="mt-10">
              <blockquote className="text-lg font-semibold text-gray-900">
                {objectMap(quote, (key, item, index) => {
                  if (item?.cite?._jsx) {
                    return (
                      <figcaption
                        key={`cite-${index}`}
                        className="mt-10 flex items-center gap-x-6"
                      >
                        <div className="text-base font-semibold text-gray-900">
                          {item.cite._jsx}
                        </div>
                      </figcaption>
                    );
                  } else if (item?._jsx) {
                    return (
                      <p key={`p-${index}`} className="mb-7">
                        {item._jsx}
                      </p>
                    );
                  }
                })}
              </blockquote>
            </figure>
          </div>
        </div>
      </Container>
    </Alignment>
  );
};

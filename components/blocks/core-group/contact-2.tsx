import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import { Alignment, Container, Heading, Paragraph } from '@components/common';
import { objectMap } from '@utils/objectMap';

export const CoreGroupContact2 = ({ data, className, props }: BlockProps) => {
  let h2 = data?.h2?._jsx || Missing.H2();
  let p = data?.p?._jsx || Missing.Paragraph();
  let quote = data?.wpBlockQuote || Missing.Quote();
  console.log(data);

  return (
    <Alignment as="div" align="wide" className="mt-24 sm:mt-32">
      <div className="mx-auto">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <Heading as="h2" className="!mt-0">
                {h2}
              </Heading>
              <Paragraph className="">{p}</Paragraph>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              {data &&
                objectMap(data, (key, item, index) => {
                  if (!key.includes('wpBlockGroup')) {
                    return;
                  }
                  const h3 = item?.h3?._jsx || Missing.H3();
                  const linkText = item?.p?.a?._text || Missing.Link();
                  const href = item?.p?.a?._href || null;
                  return (
                    <a
                      href={href}
                      key={`contact-${index}`}
                      className="rounded-2xl bg-gray-50 p-10 group hover:bg-gray-100"
                    >
                      <Heading
                        as="h3"
                        className="text-base/7 font-semibold text-gray-900"
                      >
                        {h3}
                      </Heading>
                      <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                        <div>
                          <dt className="sr-only">{h3}</dt>
                          <dd className="font-semibold text-accent">
                            {linkText}
                          </dd>
                        </div>
                      </dl>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Alignment>
  );
};

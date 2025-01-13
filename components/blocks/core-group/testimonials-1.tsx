import {
  Alignment,
  Heading,
  HeadingAccent,
  Paragraph,
} from '@components/common';
import Container from '@components/container';
import { BlockProps } from '@lib/types';
import { objectMap } from '@utils/objectMap';
import classNames from 'classnames';
import * as Missing from '@components/global/missing';

export const CoreGroupTestimonials1 = ({
  data,
  className,
  props,
}: BlockProps) => {
  let column1: any[] = [];
  let column2: any[] = [];
  let column3: any[] = [];
  let column4: any[] = [];

  let h1 = data?.h1?._jsx || Missing.H1();

  data &&
    objectMap(data, (key, item, index) => {
      if (item._className.includes('wp-block-quote')) {
        if (index !== 0) {
          if (index < 4) {
            column1.push(item);
          } else if (index < 6) {
            column2.push(item);
          } else if (index < 8) {
            column3.push(item);
          } else if (index < 11) {
            column4.push(item);
          }
        }
      }
    });

  let testimonials: any[] = [
    [column1, column2],
    [column3, column4],
  ];

  let featuredTestimonial = data.wpBlockQuote;
  return (
    <Alignment align="wide" className="wp-block-group py-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-accent to-accent-gradient opacity-30"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-accent to-accent-gradient xl:ml-0 xl:mr-[calc(50%-12rem)] opacity-30"
        />
      </div>
      <div className="flex-auto !mt-0">
        <HeadingAccent as="h1" className="!mt-0">
          Client Testimonials
        </HeadingAccent>
        <Heading
          as="h2"
          inStyle="h1"
          className={classNames(
            '!mt-6 [text-wrap:balance] max-w-[900px] !w-full'
          )}
        >
          {h1}
        </Heading>
        <div className="w-full mt-16 grid grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6">
              <Paragraph as="large">{`“${featuredTestimonial.p._jsx}”`}</Paragraph>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.p_2._text}
                </div>
              </div>
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column: any, columnIdx: any) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8 w-full'
                  )}
                >
                  {column.map((testimonial: any) => (
                    <figure
                      key={testimonial.p_2._text}
                      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 w-full"
                    >
                      <blockquote className="">
                        <Paragraph>{`“${testimonial.p._text}”`}</Paragraph>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <div>
                          <div className="font-semibold">
                            {testimonial.p_2._text}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Alignment>
  );
};

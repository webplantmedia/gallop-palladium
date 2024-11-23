import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import { Paragraph, Heading, Alignment } from '@components/common';

export const CoreGroupHeader2 = ({ data, className, props }: BlockProps) => {
  let h1 = data?.h1?.jsx || Missing.H1();
  let p = data?.p?.jsx || Missing.Paragraph();

  return (
    <Alignment align="full" className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 !max-w-screen-3xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Heading as="h1">{h1}</Heading>
          <Paragraph as="leader" className="mt-8 text-gray-700 !mb-0">
            {p}
          </Paragraph>
        </div>
      </div>
    </Alignment>
  );
};

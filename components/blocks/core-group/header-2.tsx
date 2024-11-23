import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import { Paragraph, Heading } from '@components/common';

export const CoreGroupHeader2 = ({ data, className, props }: BlockProps) => {
  let h1 = data?.h1?.jsx || Missing.H1();
  let p = data?.p?.jsx || Missing.Paragraph();

  return (
    <div className="bg-transparent py-24 sm:py-32 !max-w-none clear-both alignfull">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 !max-w-screen-3xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Heading as="h1">{h1}</Heading>
          <Paragraph as="leader" className="mt-8 text-gray-800 !mb-0">
            {p}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

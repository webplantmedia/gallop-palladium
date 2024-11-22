import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';

export const CoreGroupHeader2 = ({ data, className, props }: BlockProps) => {
  let h1 = data?.h1?.jsx || Missing.H1();
  let p = data?.p?.jsx || Missing.Paragraph();

  return (
    <div className="bg-transparent py-24 sm:py-32 !max-w-none clear-both alignfull">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 !max-w-screen-3xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            {h1}
          </h2>
          <p className="mt-8 text-pretty text-2xl font-medium sm:text-xl/8 gallop-hero-intro text-black/50">
            {p}
          </p>
        </div>
      </div>
    </div>
  );
};

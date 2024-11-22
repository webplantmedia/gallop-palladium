import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';

export const CoreGroupHeader1 = ({ data, className, props }: BlockProps) => {
  let h1 = data?.h1?.jsx || Missing.H1();
  let p = data?.p?.jsx || Missing.Paragraph();

  return (
    <div className="bg-accent py-24 sm:py-32 !max-w-none clear-both alignfull">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 !max-w-screen-3xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl text-white">
            {h1}
          </h2>
          <p className="mt-8 text-pretty text-lg font-medium sm:text-xl/8 gallop-hero-intro text-white/50">
            {p}
          </p>
        </div>
      </div>
    </div>
  );
};

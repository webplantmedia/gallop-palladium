import * as Missing from '@components/global/missing';
import classNames from 'classnames';
import { GridPattern } from '@components/widgets/grid-pattern';

export const CoreGroupHero2 = ({ data, className }: any) => {
  let h1 = data?.h1?.jsx || Missing.H1();
  let h2 = data?.h2?.jsx || Missing.H2();
  let p1 = data?.p?.jsx || Missing.Paragraph();
  let p2 = data?.p_2?.jsx || Missing.Paragraph();
  let p3 = data?.p_3?.jsx || Missing.Paragraph();

  return (
    <div className="wp-block-group alignfull py-20">
      <GridPattern
        className="!max-w-none !px-0 absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-accent/40 stroke-accent/10 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={-96}
        interactive
      />

      <div className="w-full flex-auto !max-w-screen-3xl mx-auto">
        <h1>
          <span className="block font-display gallop-h1">{h1}</span>
          <span className="sr-only"> - </span>
          <span
            className={classNames(
              'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl'
            )}
          >
            {h2}
          </span>
        </h1>
        <div className={classNames('mt-6 max-w-3xl text-xl text-neutral-600')}>
          <p>{p1}</p>
          <div className="mt-10 max-w-2xl space-y-6 text-base">
            <p>{p2}</p>
            <p>{p3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

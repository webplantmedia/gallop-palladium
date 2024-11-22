import * as Missing from '@components/global/missing';
import classNames from 'classnames';
import { GridPattern } from '@components/widgets/grid-pattern';

export const CoreGroupHero2 = ({ data, className }: any) => {
  return (
    <div className="wp-block-group alignfull">
      <GridPattern
        className="!max-w-none !px-0 absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={-96}
        interactive
      />

      <div className="w-full flex-auto !max-w-screen-3xl mx-auto">
        <h1>
          <span className="block font-display text-base font-semibold text-neutral-950">
            About us
          </span>
          <span className="sr-only"> - </span>
          <span
            className={classNames(
              'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl'
            )}
          >
            Our strength is collaboration
          </span>
        </h1>
        <div className={classNames('mt-6 max-w-3xl text-xl text-neutral-600')}>
          <p>
            We believe that our strength lies in our collaborative approach,
            which puts our clients at the center of everything we do.
          </p>
          <div className="mt-10 max-w-2xl space-y-6 text-base">
            <p>
              Studio was started by three friends who noticed that developer
              studios were charging clients double what an in-house team would
              cost. Since the beginning, we have been committed to doing things
              differently by charging triple instead.
            </p>
            <p>
              At Studio, we’re more than just colleagues — we’re a family. This
              means we pay very little and expect people to work late. We want
              our employees to bring their whole selves to work. In return, we
              just ask that they keep themselves there until at least 6:30pm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import * as Missing from '@components/global/missing';
import classNames from 'classnames';
import { GridPattern } from '@components/widgets/grid-pattern';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { extractMilestone } from '@utils/tools';
import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';

function StatListItem({ label, value }: { label: string; value: string }) {
  const data = extractMilestone(value);
  return (
    <div className="flex flex-col-reverse">
      <dt className="border-l-2 border-gray-200 pl-8 py-4 mt-0 mb-0 text-base text-neutral-600">
        {label}
      </dt>
      <dd className="border-l-2 border-accent pl-8 font-display text-3xl sm:text-5xl text-6xl font-medium tracking-tight">
        {data?.prefix && data.prefix}
        <AnimatedNumber start={0} end={data.number} decimals={data.decimals} />
        {data.unit}
        {data.suffix}
      </dd>
    </div>
  );
}

export const CoreGroupHero2 = ({ data, className }: any) => {
  let h1 = data?.h1?.jsx || Missing.H1();
  let h2 = data?.h2?.jsx || Missing.H2();
  let p1 = data?.p?.jsx || Missing.Paragraph();
  let p2 = data?.p_2?.jsx || Missing.Paragraph();
  let p3 = data?.p_3?.jsx || Missing.Paragraph();
  let itemValue1 = data?.wpBlockGroup?.h4?.jsx || Missing.H4();
  let itemLabel1 = data?.wpBlockGroup?.p?.jsx || Missing.Paragraph();
  let itemValue2 = data?.wpBlockGroup_2?.h4?.jsx || Missing.H4();
  let itemLabel2 = data?.wpBlockGroup_2?.p?.jsx || Missing.Paragraph();
  let itemValue3 = data?.wpBlockGroup_3?.h4?.jsx || Missing.H4();
  let itemLabel3 = data?.wpBlockGroup_3?.p?.jsx || Missing.Paragraph();

  return (
    <div className="wp-block-group alignfull py-20">
      <GridPattern
        className="!max-w-none !px-0 absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-accent/30 stroke-accent/10 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={-96}
        interactive
      />

      <div className="w-full flex-auto !max-w-screen-3xl mx-auto">
        <h1 className="gallop-accent-heading">
          {h1}
          <Iconify
            icon={ArrowInsertIcon}
            className="flex-shrink-0 h-auto w-7 rotate-180"
          />
        </h1>
        <h2
          className={classNames(
            'gallop-h1 !mt-6 [text-wrap:balance] max-w-[900px]'
          )}
        >
          {h2}
        </h2>
        <div className={classNames('mt-6 max-w-3xl text-xl text-neutral-600')}>
          <p>{p1}</p>
          <div className="mt-10 max-w-2xl space-y-6 text-base">
            <p>{p2}</p>
            <p>{p3}</p>
          </div>
        </div>
        <div className="!px-0 max-w-7xl px-6 lg:px-8 mt-16">
          <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
            <StatListItem value={itemValue1} label={itemLabel1} />
            <StatListItem value={itemValue2} label={itemLabel2} />
            <StatListItem value={itemValue3} label={itemLabel3} />
          </dl>
        </div>
      </div>
    </div>
  );
};

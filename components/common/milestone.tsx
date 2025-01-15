import * as Missing from '@components/global/missing';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { extractMilestone } from '@utils/tools';
import classNames from 'classnames';

const renderUnit = (unit: string | null) => {
  if (unit === '★') {
    return <span className="text-3xl ml-2">{unit}</span>;
  }
  return unit;
};

export function Milestone({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const milestone = label
    ? extractMilestone(label)
    : Missing.MilestoneData('h4');

  return (
    <div
      className={classNames(
        milestone?.error ? milestone.error : '',
        'flex flex-col-reverse',
        className
      )}
    >
      <dt className="border-l-2 border-gray-200 pl-8 py-4 mt-0 mb-0 text-base text-neutral-600">
        {milestone.suffix}
      </dt>
      <dd className="border-l-2 border-accent pl-8 font-display text-5xl sm:text-6xl font-medium tracking-tight">
        {milestone?.prefix && milestone.prefix}
        <AnimatedNumber
          start={0}
          end={milestone.number}
          decimals={milestone.decimals}
        />
        {renderUnit(milestone.unit)}
      </dd>
    </div>
  );
}

export function Milestone2({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const milestone = label
    ? extractMilestone(label)
    : Missing.MilestoneData('h4');

  return (
    <div
      className={classNames(
        milestone?.error ? milestone.error : '',
        'flex flex-col gap-y-2',
        className
      )}
    >
      <dt className="text-sm/6 text-base-contrast">{milestone.suffix}</dt>
      <dd className="order-first text-6xl font-medium tracking-tight flex items-center">
        <>
          {milestone.prefix}
          <AnimatedNumber
            start={0}
            end={milestone.number}
            decimals={milestone.decimals}
          />
          {renderUnit(milestone.unit)}
        </>
      </dd>
    </div>
  );
}

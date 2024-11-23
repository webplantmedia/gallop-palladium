import * as Missing from '@components/global/missing';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { extractMilestone } from '@utils/tools';
import classNames from 'classnames';

export function Milestone({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const milestone = text ? extractMilestone(text) : Missing.MilestoneData('h4');

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
        {milestone.unit}
      </dd>
    </div>
  );
}
export function Milestone2({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const milestone = text ? extractMilestone(text) : Missing.MilestoneData('h4');

  return (
    <div
      className={classNames(
        milestone?.error ? milestone.error : '',
        'flex flex-col gap-y-2',
        className
      )}
    >
      <dt className="text-sm/6 text-base-contrast">{milestone.suffix}</dt>
      <dd className="order-first text-6xl font-medium tracking-tight">
        <>
          {milestone.prefix}
          <AnimatedNumber
            start={0}
            end={milestone.number}
            decimals={milestone.decimals}
          />
          {milestone.unit}
        </>
      </dd>
    </div>
  );
}

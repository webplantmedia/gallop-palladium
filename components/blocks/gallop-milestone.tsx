import { getDomNodeText, extractMilestone } from '@utils/tools';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { Element } from 'html-react-parser';
import classNames from 'classnames';

export const gallopMilestone = (
  domNode: Element,
  className: string | null = null
) => {
  const text = getDomNodeText(domNode);
  const data = extractMilestone(text);
  return (
    <div className={classNames(className, 'flex flex-col gap-y-2')}>
      {data?.suffix && (
        <dt className="text-sm/6 text-base-contrast">{data?.suffix}</dt>
      )}
      <dd className="order-first text-7xl font-medium tracking-tight">
        <>
          {data?.prefix && data.prefix}
          <AnimatedNumber
            start={0}
            end={data.number}
            decimals={data.decimals}
          />
          {data.unit}
        </>
      </dd>
    </div>
  );
};

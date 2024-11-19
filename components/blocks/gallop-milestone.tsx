import { getDomNodeText, extractMilestone } from '@utils/tools';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { Element } from 'html-react-parser';

export const gallopMilestone = (domNode: Element) => {
  const text = getDomNodeText(domNode);
  const data = extractMilestone(text);
  return (
    <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-base-contrast max-sm:pb-4">
      {data?.suffix && (
        <dt className="text-sm/6 text-base-contrast">{data?.suffix}</dt>
      )}
      <dd className="order-first text-6xl font-medium tracking-tight">
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

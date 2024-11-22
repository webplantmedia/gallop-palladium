import { BlockProps } from '@lib/types';
import classNames from 'classnames';
import { AnimatedNumber } from '@components/widgets/animated-number';
import { extractMilestone } from '@utils/tools';
import * as Missing from '@components/global/missing';

const GallopMilestone = ({ milestoneStr, index }: any) => {
  if (milestoneStr) {
    const milestone = extractMilestone(milestoneStr);
    return (
      <div
        className={classNames(
          'flex flex-col gap-y-2 text-secondary-contrast items-center'
        )}
        key={index}
      >
        {milestone?.suffix && (
          <dt className="text-sm/6 text-secondary-contrast">
            {milestone?.suffix}
          </dt>
        )}
        <dd className="order-first text-7xl font-medium tracking-tight ">
          <>
            {milestone?.prefix && milestone.prefix}
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
  } else {
    return Missing.Milestone();
  }
};

export const CoreGroupSection3 = ({ data, className, props }: BlockProps) => {
  let h2 = data?.h2?.jsx || Missing.H2();
  let p = data?.p?.jsx || Missing.Paragraph();
  const button1 =
    data?.wpBlockButtons?.wpBlockButton?.a?.text || Missing.Button();
  const button2 =
    data?.wpBlockButtons?.wpBlockButton_2?.a?.text || Missing.Button();
  const button3 =
    data?.wpBlockButtons?.wpBlockButton_3?.a?.text || Missing.Button();
  const button4 =
    data?.wpBlockButtons?.wpBlockButton_4?.a?.text || Missing.Button();
  const button1Href = data?.wpBlockButtons?.wpBlockButton?.a?.href || null;
  const button2Href = data?.wpBlockButtons?.wpBlockButton_2?.a?.href || null;
  const button3Href = data?.wpBlockButtons?.wpBlockButton_3?.a?.href || null;
  const button4Href = data?.wpBlockButtons?.wpBlockButton_4?.a?.href || null;
  let img = data?.wpBlockImage?.img || Missing.Image();
  var milestones, milestone1, milestone2, milestone3, milestone4;
  if (data?.wpBlockGroup?.className?.includes('is-style-milestones')) {
    milestone1 = (
      <GallopMilestone milestoneStr={data?.wpBlockGroup?.h4?.text} />
    );
    milestone2 = (
      <GallopMilestone milestoneStr={data?.wpBlockGroup?.h4_2?.text} />
    );
    milestone3 = (
      <GallopMilestone milestoneStr={data?.wpBlockGroup?.h4_3?.text} />
    );
    milestone4 = (
      <GallopMilestone milestoneStr={data?.wpBlockGroup?.h4_4?.text} />
    );

    milestones = [milestone1, milestone2, milestone3, milestone4];
  }

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 !max-w-none alignfull clear-both">
      <img
        alt=""
        src={img.src}
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black bg-opacity-75"></div>
      {/* <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div> */}
      {/* <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div> */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            {h2}
          </h2>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
            {p}
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <a href={button1Href} className="gallop-button">
              {button1}
            </a>
            <a href={button2Href} className="gallop-button">
              {button2}
            </a>
            <a href={button3Href} className="gallop-button">
              {button3}
            </a>
            <a href={button4Href} className="gallop-button">
              {button4}
            </a>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {milestones?.map((item) => item)}
          </dl>
        </div>
      </div>
    </div>
  );
};

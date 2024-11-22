import classNames from 'classnames';
import * as Missing from '@components/global/missing';
import { getDomNodeText, extractMilestone } from '@utils/tools';
import { BlockProps } from '@lib/types';
import { AnimatedNumber } from '@components/widgets/animated-number';

export const CoreGroupSection1 = ({ data, className, props }: BlockProps) => {
  const img1 = data?.wpBlockGallery?.wpBlockImage?.img || Missing.Image();
  const img2 = data?.wpBlockGallery?.wpBlockImage_2?.img || Missing.Image();
  const img3 = data?.wpBlockGallery?.wpBlockImage_3?.img || Missing.Image();
  const img4 = data?.wpBlockGallery?.wpBlockImage_4?.img || Missing.Image();
  const h2 = data?.h2 || Missing.H2();
  const p = data?.p || Missing.Paragraph();
  const h3 = data?.h3 || Missing.H3();
  const p_2 = data?.p_2 || Missing.Paragraph();
  const h3_2 = data?.h3_2 || Missing.H3();
  const p_3 = data?.p_3 || Missing.Paragraph();
  const milestone1 = data?.h4?.text
    ? extractMilestone(data.h4.text)
    : Missing.MilestoneData('h4');
  const milestone2 = data?.h4_2?.text
    ? extractMilestone(data.h4_2.text)
    : Missing.MilestoneData('h4');
  const milestone3 = data?.h4_3?.text
    ? extractMilestone(data.h4_3.text)
    : Missing.MilestoneData('h4');
  const milestone4 = data?.h4_4?.text
    ? extractMilestone(data.h4_4.text)
    : Missing.MilestoneData('h4');

  return (
    <div className={classNames('alignwide overflow-hidden mt-16 mb-16')}>
      <h2 className={classNames('gallop-h2 !mb-2 !mt-0')}>{h2.jsx}</h2>
      <p className="gallop-lead max-w-3xl ">{p.jsx}</p>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h3 className="gallop-h3 !mb-1">{h3.jsx}</h3>
          <p className="gallop-p mt-6">{p_2.jsx}</p>
          <p className="gallop-p mt-8">{p_3.jsx}</p>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                className={classNames(
                  img1.className,
                  'block size-full object-cover'
                )}
                loading="lazy"
                src={img1.src}
                style={img1.style}
                width={parseInt(img1.width)}
                height={parseInt(img1.height)}
                srcSet={img1.srcSet}
                sizes={img1.sizes}
                alt={img1.alt}
                title={img1.title}
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                className={classNames(
                  img2.className,
                  'block size-full object-cover'
                )}
                loading="lazy"
                src={img2.src}
                style={img2.style}
                width={parseInt(img2.width)}
                height={parseInt(img2.height)}
                srcSet={img2.srcSet}
                sizes={img2.sizes}
                alt={img2.alt}
                title={img2.title}
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                className={classNames(
                  img3.className,
                  'block size-full object-cover'
                )}
                loading="lazy"
                src={img3.src}
                style={img3.style}
                width={parseInt(img3.width)}
                height={parseInt(img3.height)}
                srcSet={img3.srcSet}
                sizes={img3.sizes}
                alt={img3.alt}
                title={img3.title}
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                className={classNames(
                  img4.className,
                  'block size-full object-cover'
                )}
                loading="lazy"
                src={img4.src}
                style={img4.style}
                width={parseInt(img4.width)}
                height={parseInt(img4.height)}
                srcSet={img4.srcSet}
                sizes={img4.sizes}
                alt={img4.alt}
                title={img4.title}
              />
            </div>
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <h3 className="gallop-h3 !mb-1">{h3_2.jsx}</h3>
          <hr className="mt-6 border-t border-base-contrast" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div
              className={classNames(
                milestone1?.error ? milestone4.error : '',
                'flex flex-col gap-y-2 border-b border-base-contrast pb-4'
              )}
            >
              <dt className="text-sm/6 text-base-contrast">
                {milestone1.suffix}
              </dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <>
                  {milestone1.prefix}
                  <AnimatedNumber
                    start={0}
                    end={milestone1.number}
                    decimals={milestone1.decimals}
                  />
                  {milestone1.unit}
                </>
              </dd>
            </div>
            <div
              className={classNames(
                milestone2?.error ? milestone4.error : '',
                'flex flex-col gap-y-2 border-b border-base-contrast pb-4'
              )}
            >
              <dt className="text-sm/6 text-base-contrast">
                {milestone2.suffix}
              </dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <>
                  {milestone2.prefix}
                  <AnimatedNumber
                    start={0}
                    end={milestone2.number}
                    decimals={milestone2.decimals}
                  />
                  {milestone2.unit}
                </>
              </dd>
            </div>
            <div
              className={classNames(
                milestone3?.error ? milestone4.error : '',
                'flex flex-col gap-y-2 max-sm:border-b max-sm:border-base-contrast max-sm:pb-4'
              )}
            >
              <dt className="text-sm/6 text-base-contrast">
                {milestone3.suffix}
              </dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <>
                  {milestone3.prefix}
                  <AnimatedNumber
                    start={0}
                    end={milestone3.number}
                    decimals={milestone3.decimals}
                  />
                  {milestone3.unit}
                </>
              </dd>
            </div>
            <div
              className={classNames(
                milestone4?.error ? milestone4.error : '',
                'flex flex-col gap-y-2'
              )}
            >
              <dt className="text-sm/6 text-base-contrast">
                {milestone4.suffix}
              </dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <>
                  {milestone4.prefix}
                  <AnimatedNumber
                    start={0}
                    end={milestone4.number}
                    decimals={milestone4.decimals}
                  />
                  {milestone4.unit}
                </>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
};

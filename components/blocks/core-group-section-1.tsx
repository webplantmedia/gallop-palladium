import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import PlayIcon from '@iconify/icons-heroicons/play';
// import BuildingOfficeIcon from '@iconify/icons-heroicons/building-office';
import classNames from 'classnames';
import {
  getVimeoIframeSrc,
  replaceWordPressUrlRelative,
  tailwindGetAlignClasses,
} from '@utils/tools';
import { VideoPopup } from '@widgets/video-popup';
import { CoreParagraph, CoreHeading } from '@components/blocks';
import { BlockProps } from '@lib/types';
import { AnimatedNumber } from '@components/widgets/animated-number';

export const CoreGroupSection1 = ({ data, className, props }: BlockProps) => {
  className = tailwindGetAlignClasses(className);
  const img1 = data?.wpBlockGallery?.wpBlockImage?.img || null;
  const img2 = data?.wpBlockGallery?.wpBlockImage_2?.img || null;
  const img3 = data?.wpBlockGallery?.wpBlockImage_3?.img || null;
  const img4 = data?.wpBlockGallery?.wpBlockImage_4?.img || null;

  return (
    <div className={classNames(className, 'overflow-hidden')}>
      <h2
        className={classNames(
          'mb-2 leading-tight text-4xl md:text-5xl lg:text-6xl text-base-contrast mt-14 font-bold'
        )}
      >
        Helping companies generate revenue.
      </h2>
      <p className="has-x-large-font-size text-xl sm:text-2xl lg:text-3xl !mb-14 !leading-relaxed max-w-3xl ">
        We’re on a mission to transform revenue organizations by harnessing vast
        amounts of illegally acquired customer data.
      </p>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="mb-1 leading-tight text-2xl md:text-3xl text-primary-main font-medium">
            Our mission
          </h2>
          <p className="mt-6 text-base-contrast mb-7 leading-normal">
            At RRadiant, we are dedicated to transforming the way revenue
            organizations source and close deals. Our mission is to provide our
            customers with an unfair advantage over both their competitors and
            potential customers through insight and analysis. We’ll stop at
            nothing to get you the data you need to close a deal.
          </p>
          <p className="mt-8 text-base-contrast mb-7 leading-normal">
            We’re customer-obsessed — putting the time in to build a detailed
            financial picture of every one of our customers so that we know more
            about your business than you do. We are in this together, mostly
            because we are all implicated in large-scale financial crime. In our
            history as a company, we’ve never lost a customer, because if any
            one of us talks, we all go down.
          </p>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            {img1 && (
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
            )}
            {img2 && (
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
            )}
            {img3 && (
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
            )}
            {img4 && (
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
            )}
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <h3 className="mb-1 leading-tight text-xl md:text-xl text-primary-main font-medium">
            The Numbers
          </h3>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Raised</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                $<AnimatedNumber start={100} end={150} />M
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Companies</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={15} end={30} />K
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
              <dt className="text-sm/6 text-gray-600">Deals Closed</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={0.9} end={1.5} decimals={1} />M
              </dd>
            </div>
            <div className="flex flex-col gap-y-2">
              <dt className="text-sm/6 text-gray-600">Leads Generated</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={150} end={200} />M
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
};

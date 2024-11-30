import classNames from 'classnames';
import * as Missing from '@components/global/missing';
import { BlockProps } from '@lib/types';
import {
  Image,
  Heading,
  Paragraph,
  Alignment,
  Milestone2,
} from '@components/common';

export const CoreGroupSection1 = ({ data, className, props }: BlockProps) => {
  const attr1 = data?.wpBlockGallery?.wpBlockImage?.img;
  const attr2 = data?.wpBlockGallery?.wpBlockImage_2?.img;
  const attr3 = data?.wpBlockGallery?.wpBlockImage_3?.img;
  const attr4 = data?.wpBlockGallery?.wpBlockImage_4?.img;
  const h2 = data?.h2?._jsx || Missing.H2();
  const p = data?.p?._jsx || Missing.Paragraph();
  const h3 = data?.h3?._jsx || Missing.H3();
  const p_2 = data?.p_2?._jsx || Missing.Paragraph();
  const h3_2 = data?.h3_2?._jsx || Missing.H3();
  const p_3 = data?.p_3?._jsx || Missing.Paragraph();
  const milestone1 = data?.h4?._text;
  const milestone2 = data?.h4_2?._text;
  const milestone3 = data?.h4_3?._text;
  const milestone4 = data?.h4_4?._text;

  return (
    <Alignment
      align="wide"
      className={classNames('overflow-hidden pt-16 pb-16')}
    >
      <Heading as="h2" className="!mb-2 !mt-0">
        {h2}
      </Heading>
      <Paragraph as="leader" className="!max-w-3xl">
        {p}
      </Paragraph>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <Heading as="h3" className="!mb-1">
            {h3}
          </Heading>
          <Paragraph className="mt-6">{p_2}</Paragraph>
          <Paragraph className="mt-8">{p_3}</Paragraph>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <Image attr={attr1} className="block size-full object-cover" />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <Image attr={attr2} className="block size-full object-cover" />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <Image attr={attr3} className="block size-full object-cover" />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <Image attr={attr4} className="block size-full object-cover" />
            </div>
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <Heading as="h3" className="!mb-1">
            {h3_2}
          </Heading>
          <hr className="mt-6 border-t border-base-contrast" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <Milestone2
              label={milestone1}
              className="border-b border-base-contrast pb-4"
            />
            <Milestone2
              label={milestone2}
              className="border-b border-base-contrast pb-4"
            />
            <Milestone2
              label={milestone3}
              className="max-sm:border-b max-sm:border-base-contrast max-sm:pb-4"
            />
            <Milestone2 label={milestone4} className="" />
          </dl>
        </div>
      </section>
    </Alignment>
  );
};

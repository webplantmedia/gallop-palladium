import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import { Paragraph, Heading, Image } from '@components/common/';

export const CoreGroupTeam1 = ({ data, className, props }: BlockProps) => {
  const h3 = data?.h3?._jsx || Missing.H3();
  const h4 = data?.h4?._jsx || Missing.H4();
  const p = data?.p?._jsx || Missing.Paragraph();
  const img = data?.wpBlockImage?.a?.img
    ? data.wpBlockImage.a.img
    : data?.wpBlockImage?.img
    ? data.wpBlockImage.img
    : {};

  return (
    <div className="flex flex-col gap-10 pt-12 sm:flex-row">
      <Image
        attr={img}
        className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
      />
      <div className="max-w-xl flex-auto">
        <Heading as="h3">{h3}</Heading>
        <Heading as="h4">{h4}</Heading>
        <Paragraph>{p}</Paragraph>
      </div>
    </div>
  );
};

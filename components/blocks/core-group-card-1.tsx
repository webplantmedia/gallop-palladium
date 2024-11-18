import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import PlayIcon from '@iconify/icons-heroicons/play';
// import BuildingOfficeIcon from '@iconify/icons-heroicons/building-office';
import classNames from 'classnames';
import { getVimeoIframeSrc } from '@utils/tools';
import { VideoPopup } from '@widgets/video-popup';
import { CoreParagraph, CoreHeading } from '@components/blocks';
import { BlockProps } from '@lib/types';

export const CoreGroupCard1 = ({ data, className, props }: BlockProps) => {
  let img: any = {};
  let href = '';
  let button = data?.wpBlockButtons?.wpBlockButton?.a;
  let blockImage = data?.wpBlockImage;
  if (blockImage?.a?.img) {
    img = { ...blockImage.a.img };
    href = blockImage.a.href;
  } else {
    img = { ...blockImage.img };
  }
  const embed = data?.wpBlockEmbed || null;

  const src = getVimeoIframeSrc(href);

  let image = (
    <>
      <img
        sizes={img.sizes}
        srcSet={img.srcset}
        className={classNames(img.class, 'aspect-video object-cover')}
        alt={img.alt}
        src={img.src}
        height={img.height}
        width={img.width}
      />
      {embed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-white/50 bg-white/20 group-hover:border-white/70 group-hover:bg-white/30">
            <Iconify
              icon={PlayIcon}
              className="flex-shrink-0 text-white/50 h-auto w-10 relative left-[2px] group-hover:text-white/70"
            />
          </span>
        </div>
      )}
    </>
  );

  if (embed || href) {
    console.log(embed);
    image = (
      <VideoPopup className="relative group" url={href} embed={embed}>
        {image}
      </VideoPopup>
    );
  }

  // img.className = img.class;
  // img.srcSet = img.srcset;
  // delete img.class;
  // delete img.srcset;
  // console.log(img);

  let buttonHtml = (
    <a
      className="text-base py-3 px-5 w-full flex justify-center items-center gap-2"
      href={button?.href}
    >
      {button?.jsx}
      <Iconify
        icon={ArrowInsertIcon}
        className="flex-shrink-0 h-auto w-6 rotate-90 inline"
      />
    </a>
  );

  if (!button?.href || button.href === '#') {
    buttonHtml = (
      <div className="text-base py-3 px-5 w-full flex justify-center items-center gap-2 cursor-pointer">
        {button?.jsx}
        <Iconify
          icon={ArrowInsertIcon}
          className="flex-shrink-0 h-auto w-6 rotate-90 inline"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 rounded-md overflow-clip shadow-lg">
      {image}
      <div className="bg-base-card px-7 py-7 h-full flex flex-col [&>*:last-child]:!mb-0">
        <CoreHeading tag="h4" props={props} className="is-style-h3">
          {data?.h4?.jsx}
        </CoreHeading>
        <CoreParagraph className="">{data.p?.jsx}</CoreParagraph>
        {button && (
          <div className="text-center rounded-md shadow-sm flex items-center justify-center mt-auto bg-primary-main text-primary-contrast hover:bg-primary-light">
            {buttonHtml}
          </div>
        )}
      </div>
    </div>
  );
};

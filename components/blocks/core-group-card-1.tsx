import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import PlayIcon from '@iconify/icons-heroicons/play';
// import BuildingOfficeIcon from '@iconify/icons-heroicons/building-office';
import classNames from 'classnames';
import { getVimeoIframeSrc, getVarsFromHTML } from '@utils/tools';
import { VideoPopup } from '@widgets/video-popup';
import { CoreParagraph, CoreHeading } from '@components/blocks';

export const CoreGroupCard1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  console.log('DATA', data);

  let img: any = {};
  let href = '#';
  let button = data?.div?.div?.a;
  let figure = data?.figure;
  if (figure?.a?.img) {
    img = { ...figure.a.img };
    href = figure.a.href;
  } else {
    img = { ...figure.img };
  }

  const src = getVimeoIframeSrc(href);

  // img.className = img.class;
  // img.srcSet = img.srcset;
  // delete img.class;
  // delete img.srcset;
  // console.log(img);

  return (
    <div className="flex flex-col gap-0 rounded-md overflow-clip shadow-lg">
      <VideoPopup className="relative group" src={src} url={href}>
        <img
          sizes={img.sizes}
          srcSet={img.srcset}
          className={classNames(img.class, 'aspect-video object-cover')}
          alt={img.alt}
          src={img.src}
          height={img.height}
          width={img.width}
        />
        {src && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-white/50 bg-white/20 group-hover:border-white/70 group-hover:bg-white/30">
              <Iconify
                icon={PlayIcon}
                className="flex-shrink-0 text-white/50 h-auto w-10 relative left-[2px] group-hover:text-white/70"
              />
            </span>
          </div>
        )}
      </VideoPopup>
      <div className="bg-base-card px-7 pb-7 h-full flex flex-col">
        <CoreHeading tag="h4" props={data} className="is-style-h3 !mb-2 !mt-4">
          {data?.h4?.jsx}
        </CoreHeading>
        <CoreParagraph className="">{data.p?.jsx}</CoreParagraph>
        <div className="text-center rounded-md shadow-sm flex items-center justify-center mt-auto bg-primary-main text-primary-contrast hover:bg-primary-light">
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
        </div>
      </div>
    </div>
  );
};

import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import PlayIcon from '@iconify/icons-heroicons/play';
// import BuildingOfficeIcon from '@iconify/icons-heroicons/building-office';
import classNames from 'classnames';
import { getVarsFromHTML } from '@utils/tools';
import { VideoPopup } from '@widgets/video-popup';
import { CoreButton, CoreParagraph, CoreHeading } from '@components/blocks';

export const CoreGroupCard1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  console.log('DATA', data);

  let img: any = {};
  let href = '#';
  let button = data.wpBlockButtons?.wpBlockButton?.a;
  if (data.a?.img) {
    img = { ...data.a.img };
    href = data.a.href;
  } else {
    img = { ...data.img };
  }
  img.className = img.class;
  img.srcSet = img.srcset;
  delete img.class;
  delete img.srcset;

  return (
    <div className="flex flex-col gap-0 rounded-md overflow-clip shadow-lg">
      <VideoPopup className="relative group" videoUrl={href}>
        <img {...img} />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-white/50 bg-white/20 group-hover:border-white/70 group-hover:bg-white/30">
            <Iconify
              icon={PlayIcon}
              className="flex-shrink-0 text-white/50 h-auto w-10 relative left-[2px] group-hover:text-white/70"
            />
          </span>
        </div>
      </VideoPopup>
      <div className="bg-base-card px-7 pb-7">
        <CoreHeading tag="h4" props={data} className="is-style-h3 !mb-2 !mt-4">
          {data.h4?.text}
        </CoreHeading>
        <CoreParagraph className="">{data.p?.text}</CoreParagraph>
        <CoreButton>
          <a
            className="text-base py-3 px-5 w-full flex justify-center items-center gap-2"
            href={button.href}
          >
            {button.text}
            <Iconify
              icon={ArrowInsertIcon}
              className="flex-shrink-0 h-auto w-6 rotate-90 inline"
            />
          </a>
        </CoreButton>
      </div>
    </div>
  );
};

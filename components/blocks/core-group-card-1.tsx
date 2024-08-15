import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import PlayIcon from '@iconify/icons-heroicons/play';
// import BuildingOfficeIcon from '@iconify/icons-heroicons/building-office';
import classNames from 'classnames';
import { getVarsFromHTML } from '@utils/tools';
import { useId } from 'react';
import { Fragment } from 'react';

export const CoreGroupCard1 = ({ node, className, props }) => {
  const data = getVarsFromHTML(node);
  console.log('DATA', data);
  let img: any = {};
  let href = '#';
  if (data.a?.img) {
    img = { ...data.a.img };
    href = data.a.href;
  } else {
    img = { ...data.img };
  }
  img.className = img.class;
  delete img.class;

  return (
    <div className="">
      <a className="relative group" href={href}>
        <img {...img} />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-white/50 bg-white/20 group-hover:border-white/70 group-hover:bg-white/30">
            <Iconify
              icon={PlayIcon}
              className="flex-shrink-0 text-white/50 h-auto w-10 relative left-[2px] group-hover:text-white/70"
            />
          </span>
        </div>
      </a>
    </div>
  );
};

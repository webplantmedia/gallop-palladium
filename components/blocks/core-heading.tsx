import Iconify from '@components/iconify';
import ArrowInsertIcon from '@iconify/icons-material-symbols/arrow-insert';
import classNames from 'classnames';

export const CoreHeading = ({ children, tag, className = '', props }) => {
  const { id } = props;
  const Tag = tag;

  let h1Class =
    'mb-7 leading-tight text-5xl md:text-6xl lg:text-7xl text-base-contrast font-bold';
  let h2Class =
    'mb-2 leading-tight text-4xl md:text-5xl lg:text-6xl text-base-contrast mt-14 font-bold';
  let h3Class =
    'mb-1 leading-tight text-2xl text-base-contrast small-caps font-medium dmh:font-accent dmh:normal-case dmh:variant-normal dmh:mb-2';
  let h4Class =
    'mb-7 leading-tight text-base-contrast font-medium text-base small-caps';
  let h5Class = 'mb-7 leading-tight';
  let h6Class = 'mb-7 leading-tight';

  let hClass = '';

  if (className?.includes('is-style-accent-title')) {
    let accentClass =
      'leading-tight text-xl uppercase tracking-[0.1em] text-primary-main mb-7 font-accent font-normal flex items-center';

    className = className.replace('text-center', 'justify-center');
    className = className.replace('text-left', 'justify-start');
    className = className.replace('text-right', 'justify-end');

    return (
      <Tag key={id} id={id} className={classNames(accentClass, className)}>
        {children}
        <Iconify
          icon={ArrowInsertIcon}
          className="flex-shrink-0 h-auto w-7 rotate-180"
        />
      </Tag>
    );
  } else if (className?.includes('is-style-quote-title')) {
    let quoteClass =
      'leading-tight text-3xl md:text-4xl lg:text-5xl text-base-contrast small-caps text-right text-base-contrast mb-7 dmh:xl:text-4xl dmh:text-3xl pl-8 md:pl-20';
    return (
      <Tag key={id} id={id} className={classNames(quoteClass, className)}>
        {children}
      </Tag>
    );
  }

  if (className?.includes('is-style-h1')) {
    hClass = h1Class;
  }
  if (className?.includes('is-style-h2')) {
    hClass = h2Class;
  }
  if (className?.includes('is-style-h3')) {
    hClass = h3Class;
  }

  return (
    <Tag
      key={id}
      id={id}
      className={classNames(hClass ? hClass : h1Class, className)}
    >
      {children}
    </Tag>
  );
};

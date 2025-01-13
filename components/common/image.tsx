import classNames from 'classnames';
import { styleStringToObject } from '@utils/tools';
import * as Missing from '@components/global/missing';

function removeUnderscoreFromKeys<T extends Record<string, any>>(
  obj: T
): Record<string, any> {
  return Object.keys(obj).reduce((result, key) => {
    const newKey = key.startsWith('_') ? key.slice(1) : key;
    result[newKey] = obj[key];
    return result;
  }, {} as Record<string, any>);
}

export const Image = ({
  className,
  attr = {},
}: {
  className?: string;
  attr: Record<string, any>;
}) => {
  attr = removeUnderscoreFromKeys(attr);
  if (Object.keys(attr).length === 0) {
    attr = Missing.Image();
  }
  return (
    <img
      className={classNames(className)}
      loading="lazy"
      src={attr.src}
      style={
        typeof attr.style === 'string'
          ? styleStringToObject(attr.style)
          : attr.style
      }
      width={attr.width ? Number(attr.width) : undefined}
      height={attr.height ? Number(attr.height) : undefined}
      srcSet={attr.srcSet}
      // sizes={attr.sizes}
      alt={attr.alt}
      title={attr.title}
    />
  );
};

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

interface Image {
  _src: string; // The image source URL
  _width?: string | number; // Width as a string or number
  _height?: string | number; // Height as a string or number
  _className?: string; // Additional classes for styling
  _style?: string; // Inline styles as a string or object
  _srcSet?: string; // For responsive images
  _sizes?: string; // Sizes attribute for responsive images
  _alt?: string; // Alt text for the image
  _title?: string; // Title attribute for the image
}

export const Image = ({
  className,
  attr = {},
}: {
  className?: string;
  attr: Record<string, any>;
}) => {
  attr = removeUnderscoreFromKeys(attr);
  console.log(attr);
  if (!attr) {
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

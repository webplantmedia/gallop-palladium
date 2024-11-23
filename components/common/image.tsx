import classNames from 'classnames';
import { styleStringToObject } from '@utils/tools';
import * as Missing from '@components/global/missing';

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
  if (!attr) {
    attr = Missing.Image();
  }
  return (
    <img
      className={classNames(className)}
      loading="lazy"
      src={attr._src}
      style={styleStringToObject(attr._style)}
      width={attr._width ? Number(attr._width) : undefined}
      height={attr._height ? Number(attr._height) : undefined}
      srcSet={attr._srcSet}
      sizes={attr._sizes}
      alt={attr._alt}
      title={attr._title}
    />
  );
};

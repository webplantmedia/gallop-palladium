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
  _attr = {},
}: {
  className?: string;
  attr?: Record<string, any>;
  _attr?: Record<string, any>;
}) => {
  if (!attr?.src && _attr?.src) {
    attr = Missing.Image();
  }

  if (_attr?.src) {
    return (
      <img
        className={classNames(className)}
        loading="lazy"
        src={_attr._src}
        style={styleStringToObject(_attr._style)}
        width={_attr._width ? Number(_attr._width) : undefined}
        height={_attr._height ? Number(_attr._height) : undefined}
        srcSet={_attr._srcSet}
        // sizes={_attr._sizes}
        alt={_attr._alt}
        title={_attr._title}
      />
    );
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

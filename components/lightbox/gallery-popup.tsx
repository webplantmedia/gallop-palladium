'use client';

import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import {
  NextJsImage,
  NextJsThumbnail,
} from '@components/lightbox/next-js-image';
import { useState, useEffect } from 'react';
import { SlideImage } from 'yet-another-react-lightbox/dist/types';

interface Slide extends SlideImage {
  description?: string;
  thumbnail?: string;
}

export const GalleryPopup = () => {
  const [galleries, setGalleries] = useState<
    { slides: Slide[]; open: boolean; index: number; galleryIndex: number }[]
  >([]);

  useEffect(() => {
    const galleryElements = document.querySelectorAll(
      '.main-content .wp-block-gallery, .main-content .wp-block-gallop-gridder'
    );
    // const singleImageElements = document.querySelectorAll(
    //   '.main-content > .wp-block-image > .lightbox-content'
    // );

    const singleImageElements = Array.from(
      document.querySelectorAll(
        '.main-content > .wp-block-image > .lightbox-content'
      )
    )
      .map((node) => node.parentElement)
      .filter((node) => node !== null);

    const galleryData = Array.from(galleryElements)
      .map((galleryEl, galleryIndex) => {
        const images = Array.from(
          galleryEl.querySelectorAll('.wp-block-image > .lightbox-content')
        )
          .map((node) => node.parentElement)
          .filter((node) => node !== null);

        if (images.length === 0) return null;

        const slides = images
          .map((el, index) =>
            el ? createSlide(el, galleryIndex, index) : null
          )
          .filter((slide): slide is Slide => slide !== null);

        if (slides.length === 0) return null;

        // Add event listeners for each image in the gallery
        slides.forEach((_, index) => {
          const imageElement = images[index];
          const anchorElement = imageElement?.querySelector('a');
          if (anchorElement) {
            anchorElement.addEventListener('click', (event) => {
              event.preventDefault();
              setGalleries((prevGalleries) =>
                prevGalleries.map((gallery, gIndex) =>
                  gallery.galleryIndex === galleryIndex
                    ? { ...gallery, open: true, index }
                    : gallery
                )
              );
            });
          }
        });

        return { slides, open: false, index: 0, galleryIndex: galleryIndex };
      })
      .filter((gallery) => gallery !== null);

    const singleImageData = singleImageElements
      .map((el, index) => {
        const slide = el
          ? createSlide(el, galleryData.length + index + 1, 0)
          : null;
        if (!slide) return null;

        el?.querySelector('a')?.addEventListener('click', function (event) {
          event.preventDefault();
          setGalleries((prevGalleries) =>
            prevGalleries.map((gallery, gIndex) =>
              gallery.galleryIndex === galleryData.length + index + 1
                ? { ...gallery, open: true, index: 0 }
                : gallery
            )
          );
        });

        return {
          slides: [slide],
          open: false,
          index: 0,
          galleryIndex: galleryData.length + index + 1,
        };
      })
      .filter((single) => single !== null);

    setGalleries([
      ...(galleryData as {
        slides: Slide[];
        open: boolean;
        index: number;
        galleryIndex: number;
      }[]),
      ...(singleImageData as {
        slides: Slide[];
        open: boolean;
        index: number;
        galleryIndex: number;
      }[]),
    ]);
  }, []);

  const createSlide = (
    el: Element,
    galleryIndex: number,
    imageIndex: number
  ): Slide | null => {
    const anchorElement = el.querySelector(':scope > a');
    const imgElement = el.querySelector('img');

    if (!anchorElement || !imgElement) {
      return null;
    }

    const src = anchorElement.getAttribute('href') || '';
    const srcset = imgElement.getAttribute('srcset') || '';
    const srcSet = srcset
      ? srcset.split(',').map((entry) => {
          const [url, size] = entry.trim().split(' ');
          return {
            src: url,
            width: parseInt(size, 10),
            height: parseInt(size, 10),
          };
        })
      : undefined;

    const width = imgElement.getAttribute('width')
      ? parseInt(imgElement.getAttribute('width') || '', 10)
      : undefined;
    const height = imgElement.getAttribute('height')
      ? parseInt(imgElement.getAttribute('height') || '', 10)
      : undefined;

    const figcaption = el.querySelector('figcaption');
    const description = figcaption ? figcaption.textContent?.trim() || '' : '';

    const thumbnail =
      srcSet && srcSet.length
        ? srcSet.reduce((smallest, current) => {
            return current.width < smallest.width ? current : smallest;
          }).src
        : src;

    return {
      src,
      width,
      height,
      alt: description,
      srcSet,
      imageFit: 'contain',
      thumbnail,
      description,
    };
  };

  const closeLightbox = (galleryIndex: number) => {
    setGalleries((prevGalleries) =>
      prevGalleries.map((gallery, gIndex) =>
        gIndex === galleryIndex ? { ...gallery, open: false } : gallery
      )
    );
  };

  return (
    <>
      {galleries.map((gallery, galleryIndex) => (
        <Lightbox
          key={galleryIndex}
          index={gallery.index}
          open={gallery.open}
          close={() => closeLightbox(galleryIndex)}
          slides={gallery.slides as SlideImage[]}
          plugins={
            gallery.slides.length <= 1
              ? [Captions]
              : [Captions, Thumbnails, Counter]
          }
          thumbnails={{ position: 'bottom', showToggle: true }}
          captions={{ showToggle: true, descriptionMaxLines: 8 }}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
          carousel={{ finite: true }}
          styles={{
            root: {
              '--yarl__slide_description_color': '#482401',
              '--yarl__slide_captions_container_background': 'none',
              '--yarl__color_button_active': '#482401',
              '--yarl__button_filter': 'none',
              '--yarl__counter_filter': 'none',
              '--yarl__color_button': '#482401',
              '--yarl__thumbnails_thumbnail_background': '#eed093',
              '--yarl__thumbnails_container_background_color':
                'rgba(239,217,172,0.95)',
              '--yarl__container_background_color': 'rgba(239,217,172,0.95)',
              '--yarl__color_backdrop': 'transparent',
            },
            slide: { flexDirection: 'column', alignItems: 'center' },
            captionsDescriptionContainer: {
              position: 'relative',
              paddingBottom: 0,
            },
            captionsDescription: {
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          }}
          render={{ slide: NextJsImage, thumbnail: NextJsThumbnail }}
        />
      ))}
    </>
  );
};

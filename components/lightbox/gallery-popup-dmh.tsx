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
// import { slides, advancedSlides } from '@components/lightbox/slides';
import { captureMediaElements } from '@components/content/capture-media-elements';
import { useState, useEffect, useRef } from 'react';

export const GalleryPopupDMH = ({ slides }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  useEffect(() => {
    var collection = document.querySelectorAll('.lightbox-content');
    collection.forEach(function (el, index, arr) {
      el.setAttribute('lightbox-index', String(index));
      el.addEventListener(
        'click',
        function (event: any) {
          event.preventDefault();
          let i = this.getAttribute('lightbox-index');
          setLightboxOpen(true);
          setLightboxIndex(Number(i));
        },
        false
      );
    });
  }, []);

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <Lightbox
      index={lightboxIndex}
      open={lightboxOpen}
      close={() => closeLightbox()}
      slides={slides}
      plugins={[Thumbnails, Counter, Captions]}
      thumbnails={{ position: 'bottom', showToggle: true }}
      captions={{ showToggle: true, descriptionMaxLines: 8 }}
      controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      styles={{
        root: {
          '--yarl__slide_description_color': '#482401',
          '--yarl__slide_captions_container_background': 'none',
          '--yarl__color_button_active': '#482401',
          '--yarl__button_filter': 'none',
          '--yarl__counter_filter': 'none',
          '--yarl__color_button': '#482401',
          '--yarl__thumbnails_thumbnail_background': '#ffffff',
          '--yarl__thumbnails_container_background_color':
            'rgba(255,255,255,0.95)',
          '--yarl__container_background_color': 'rgba(255,255,255,0.95)',
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
  );
};

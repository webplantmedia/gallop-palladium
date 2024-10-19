'use client';

import { blockFontImports } from '@utils/tools';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import classNames from 'classnames';
import { customMapStyle } from '@data/mapStyle';
import {
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useRef,
} from 'react';
import { setKey, setLocationType, fromAddress } from 'react-geocode';

setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
setLocationType('ROOFTOP');

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

interface MapProps {
  address?: string;
  map?: google.maps.Map | null;
  center?: google.maps.LatLngLiteral | null;
  zoom?: number;
  children?: ReactNode;
}

const SetPin = ({ center, map }: MapProps) => {
  const activeMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>(
    []
  );
  useEffect(() => {
    if (map && center) {
      const init = async () => {
        try {
          const { AdvancedMarkerElement } = (await google.maps.importLibrary(
            'marker'
          )) as google.maps.MarkerLibrary;
          var areaBound = new google.maps.LatLngBounds();

          if (center) {
            const title = document.createElement('h2');
            title.className =
              'px-1 py-1 font-body rounded-md text-xs bg-primary-main text-primary-contrast price-tag shadow-lg max-w-[200px]';
            title.textContent = 'JNL Steel';

            let position = new google.maps.LatLng(center.lat, center.lng);
            let mark = new AdvancedMarkerElement({
              position: position,
              map: map,
              content: title,
            });
            areaBound.extend(position);
            activeMarkersRef.current.push(mark);
          }
        } catch (error) {
          console.error(
            'Error loading libraries or initializing markers for homes:',
            error
          );
        }
      };
      init();

      return () => {
        if (activeMarkersRef?.current) {
          activeMarkersRef.current.forEach((marker) => (marker.map = null));
          activeMarkersRef.current.length = 0;
        }
      };
    }
  }, [map]);

  return null;
};

const Map = ({ children, address, zoom }: MapProps) => {
  const mapRef = useRef<any>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  // Initialize the map after the API is loaded and the center is set
  useEffect(() => {
    if (mapRef.current && center && !map) {
      blockFontImports();

      const m = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        gestureHandling: 'cooperative',
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
      });
      setMap(m);
    }
  }, [mapRef, map, center]); // Only depend on mapRef and center

  // Geocode the address once to get the center, and set the center state
  useEffect(() => {
    if (address) {
      fromAddress(address)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          setCenter({ lat, lng }); // Set the center of the map
        })
        .catch((error) => {
          console.error('Geocode Error:', error);
        });
    }
  }, [address]); // Ensure geocoding runs only once

  return (
    <div
      className={classNames(
        '[&_.gm-style-moc]:!top-auto [&_.gm-style-moc]:!bottom-0 [&_.gm-style-moc]:!w-full [&_.gm-style-moc]:!h-[48px]',
        'overflow-clip w-full h-full',
        'focus:outline-none'
      )}
      ref={mapRef}
      id="map"
    >
      {Children.map(children, (child) => {
        // Ensure the child is a valid React element
        if (isValidElement(child)) {
          // Cast child to the expected type to avoid type errors
          return cloneElement(child as ReactElement<MapProps>, {
            map,
            center,
          });
        }
        return child; // Return as is if not a valid element
      })}
    </div>
  );
};

export const GallopMapClient = ({ address, zoom }: MapProps) => {
  return (
    <Wrapper
      apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      render={render}
    >
      <Map address={address} zoom={zoom}>
        <SetPin />
      </Map>
    </Wrapper>
  );
};

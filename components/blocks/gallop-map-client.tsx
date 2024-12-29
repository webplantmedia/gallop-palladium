'use client';

import { blockFontImports } from '@utils/tools';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import classNames from 'classnames';
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
import ReactDOM from 'react-dom/client';
import { objectMap } from '@utils/objectMap';
import { Image } from '@components/common';

setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
setLocationType('ROOFTOP');

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

interface MapProps {
  address?: string;
  heading?: ReactElement | null;
  description?: ReactElement | null;
  image?: ReactElement | null;
  map?: google.maps.Map | null;
  center?: google.maps.LatLngLiteral | null;
  children?: ReactNode;
  data?: any | null;
}

const SetPin = ({ center, map, data }: MapProps) => {
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
          const geocodePromises = objectMap(data, async (key, item, index) => {
            const heading = item?.h2?._jsx || null;
            const address = item?.h3?._text || null;
            const description = item?.p?._jsx || null;
            const imgProps = item?.wpBlockImage?.img || null;

            if (address) {
              try {
                // Geocode the address to get the lat/lng
                const { results } = await fromAddress(address);
                const { lat, lng } = results[0].geometry.location;

                const position = new google.maps.LatLng(lat, lng);
                const info = document.createElement('div');
                info.className = classNames(
                  'relative px-0 py-0 font-body rounded-md bg-white text-base-contrast shadow-lg',
                  'lg:translate-x-1/2 lg:translate-y-1/2 lg:[clip-path:polygon(20px_0%,100%_0%,100%_100%,20px_100%,0%_50%)] -translate-y-1/2',
                  'lg:ml-10'
                );
                const infoContent = document.createElement('div');
                const infoRoot = ReactDOM.createRoot(infoContent);
                infoRoot.render(
                  <div className="flex flex-row gap-0 items-center">
                    {imgProps && (
                      <div className="block grow-0 shrink-0 max-w-[180px]">
                        <Image
                          attr={imgProps}
                          className="!mb-0 !max-w-full aspect-4/3 object-cover object-center"
                        />
                      </div>
                    )}
                    <div className="block px-4 max-w-[300px]">
                      {heading && (
                        <h3 className="text-base-contrast text-sm font-bold leading-snug mb-1">
                          {heading}
                        </h3>
                      )}
                      {description && <p className="text-xs">{description}</p>}
                    </div>
                  </div>
                );
                info.appendChild(infoContent);

                const dot = document.createElement('div');
                dot.className = classNames('translate-y-1/2');
                const pingContent = document.createElement('div');
                const pingRoot = ReactDOM.createRoot(pingContent);
                pingRoot.render(
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-main opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-primary-main"></span>
                  </span>
                );
                dot.appendChild(pingContent);

                let mark = new AdvancedMarkerElement({
                  position: position,
                  map: map,
                  content: info,
                });
                let markDot = new AdvancedMarkerElement({
                  position: position,
                  map: map,
                  content: dot,
                });
                areaBound.extend(position);
                activeMarkersRef.current.push(mark);
                activeMarkersRef.current.push(markDot);
              } catch (error) {
                console.error(`Error geocoding address "${address}":`, error);
              }
            }
          });
          await Promise.all(geocodePromises);
          map.fitBounds(areaBound, 0);
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

const Map = ({ data, address, children }: MapProps) => {
  const mapRef = useRef<any>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  // Initialize the map after the API is loaded and the center is set
  useEffect(() => {
    if (mapRef.current && center && !map) {
      blockFontImports();

      const m = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 14,
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
        'overflow-clip w-full h-full [&_*]:!border-none'
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
            data,
          });
        }
        return child; // Return as is if not a valid element
      })}
    </div>
  );
};

export const GallopMapClient = ({ data, address }: any) => {
  return (
    <Wrapper
      apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      render={render}
    >
      <Map data={data} address={address}>
        <SetPin />
      </Map>
    </Wrapper>
  );
};

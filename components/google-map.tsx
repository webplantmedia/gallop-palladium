import classNames from 'classnames';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import {
  useEffect,
  useState,
  useRef,
  ReactElement,
  Children,
  cloneElement,
} from 'react';
import { MarkerClusterer, GridAlgorithm } from '@googlemaps/markerclusterer';
import { convertToCurrencySystem } from '@utils/tools';
import { state } from '@state';
import { buildLatLngs, colors } from '@utils/tools';
import { usePathname } from 'next/navigation';
import { blockFontImports } from '@utils/tools';

const SetMapNeighborhoods = ({
  subBoundaries,
  neighborhoodsActive,
  mapStyle,
  map,
  reset,
  setReset,
  slug,
  center,
  path,
}: {
  subBoundaries: Array<any>;
  neighborhoodsActive: string;
  mapStyle: number;
  map?: google.maps.Map;
  reset?: boolean;
  setReset?: any;
  slug?: string;
  center?: any;
  path: string;
}) => {
  const activePolygonsRef = useRef<google.maps.Polygon[]>([]);
  const activeMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>(
    []
  );
  let activeIndex: number;
  let algorithm = new GridAlgorithm({ gridSize: 120 });

  useEffect(() => {
    if (reset && map) {
      if (0 in subBoundaries) {
        let { gallopNeighborhoodBoundaries, databaseId, title } =
          subBoundaries[0].node;
        var areaBound = new google.maps.LatLngBounds();
        let points = gallopNeighborhoodBoundaries.split(' ');
        var latLngs = buildLatLngs(points);
        for (var k = 0; k < latLngs.length; k++) {
          areaBound.extend(latLngs[k]);
        }
        slug == 'outside-of-dallas'
          ? map.setCenter(center)
          : map.setCenter(areaBound.getCenter());
      }
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (map) {
      const init = async () => {
        try {
          const { AdvancedMarkerElement } = (await google.maps.importLibrary(
            'marker'
          )) as google.maps.MarkerLibrary;

          activeIndex = 0;
          /*let renderer = {
            render: ({ count, position }) => {
              const priceTag = document.createElement('h2');
              priceTag.className =
                'px-1 py-1 font-body rounded-md text-xs bg-white price-tag shadow-lg max-w-[200px]';
              priceTag.textContent = count + ' Neighborhoods';

              return new AdvancedMarkerElement({
                position,
                map: map,
                content: priceTag,
              });
            },
					};*/

          for (let i = 0; i < subBoundaries.length; i++) {
            let { gallopNeighborhoodBoundaries, databaseId, title } =
              subBoundaries[i].node;

            if (neighborhoodsActive.includes(databaseId) || i === 0) {
              var areaBound = new google.maps.LatLngBounds();
              let points = gallopNeighborhoodBoundaries.split(' ');
              var latLngs = buildLatLngs(points);
              var polygon = new google.maps.Polygon({
                clickable: false,
                paths: latLngs,
                strokeColor: i === 0 ? '#000000' : colors[activeIndex % 20],
                strokeOpacity:
                  slug != 'outside-of-dallas' ? (i === 0 ? 1 : 0) : 0,
                strokeWeight: i === 0 ? 1 : 0,
                fillColor: i === 0 ? 'transparent' : colors[activeIndex % 20],
                fillOpacity: i === 0 ? 0 : 0.25,
              });
              for (var k = 0; k < latLngs.length; k++) {
                areaBound.extend(latLngs[k]);
              }
              polygon.setMap(map);
              activePolygonsRef.current.push(polygon);
              if (map && i === 0) {
                map.fitBounds(areaBound, 0);
                // map.setCenter(areaBound.getCenter());
                // map.setZoom(15.2);
              }

              if (i > 0) {
                const priceTag = document.createElement('h2');
                priceTag.className =
                  'px-1 py-1 font-body rounded-md text-xs bg-white price-tag shadow-lg max-w-[100px]';
                priceTag.textContent = title;

                var mark = new AdvancedMarkerElement({
                  position: areaBound.getCenter(),
                  map: map,
                  content: priceTag,
                });

                mark.addListener('click', ({ domEvent, latLng }) => {
                  state.dynamicSidebar = {
                    type: 'neighborhood',
                    id: databaseId,
                    content: subBoundaries[i].node,
                    route: path,
                  };
                  state.dynamicSidebarOpen = true;
                });

                activeMarkersRef.current.push(mark);
              }

              activeIndex++;
            }
          }

          /*const clusters = new MarkerClusterer({
              map,
              algorithm,
              renderer,
              markers: activeMarkers,
						});*/
        } catch (error) {
          console.error(
            'Error loading libraries or initializing markers for neighborhoods:',
            error
          );
        }
      };
      init();

      return () => {
        if (activePolygonsRef?.current) {
          activePolygonsRef.current.forEach((polygon) => polygon.setMap(null));
          activePolygonsRef.current.length = 0;
        }

        if (activeMarkersRef?.current) {
          activeMarkersRef.current.forEach((marker) => (marker.map = null));
          activeMarkersRef.current.length = 0;
        }
      };
    }
  }, [map]);

  return null;
};

const SetMapSingleNeighborhood = ({
  points,
  mapStyle,
  map,
  reset,
  setReset,
  path,
}: {
  points: Array<any>;
  mapStyle: number;
  map?: google.maps.Map;
  reset?: boolean;
  setReset?: any;
  path: string;
}) => {
  const activePolygonsRef = useRef<google.maps.Polygon>();
  let polygon: google.maps.Polygon;

  useEffect(() => {
    if (reset && map) {
      if (points) {
        var areaBound = new google.maps.LatLngBounds();
        var latLngs = buildLatLngs(points);
        for (var k = 0; k < latLngs.length; k++) {
          areaBound.extend(latLngs[k]);
        }
        map.setCenter(areaBound.getCenter());
      }
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (map) {
      var areaBound = new google.maps.LatLngBounds();
      var latLngs = buildLatLngs(points);
      activePolygonsRef.current = new google.maps.Polygon({
        clickable: false,
        paths: latLngs,
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#ac1600',
        fillOpacity: 0.25,
      });
      for (var k = 0; k < latLngs.length; k++) {
        areaBound.extend(latLngs[k]);
      }
      activePolygonsRef.current.setMap(map);
      map.fitBounds(areaBound, 0);
      map.setCenter(areaBound.getCenter());
      // map.setZoom(15.2);
    }

    return () => {
      if (activePolygonsRef?.current) {
        activePolygonsRef.current.setMap(null);
      }
    };

    // here you can interact with the imperative maps API
  }, [map]);

  return null;
};

const SetMapMLSHomes = ({
  points,
  mlsHomes,
  map,
  reset,
  setReset,
  slug,
  subBoundaries,
  neighborhoodsActive,
  path,
}: {
  points: Array<any>;
  mlsHomes: Array<any>;
  map?: google.maps.Map;
  reset?: boolean;
  setReset?: any;
  slug?: string;
  subBoundaries?: any;
  neighborhoodsActive?: string;
  path: string;
}) => {
  // const activePolygonsRef = useRef<google.maps.Polygon[]>([]);
  const activePolygonRef = useRef<google.maps.Polygon>();
  const activePolygonsRef = useRef<google.maps.Polygon[]>([]);
  const activeMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>(
    []
  );
  let algorithm = new GridAlgorithm({ gridSize: 40 });

  useEffect(() => {
    if (reset && map) {
      if (points) {
        var areaBound = new google.maps.LatLngBounds();
        var latLngs = buildLatLngs(points);
        for (var k = 0; k < latLngs.length; k++) {
          areaBound.extend(latLngs[k]);
        }
        map.setCenter(areaBound.getCenter());
      }
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (map) {
      const init = async () => {
        try {
          const { AdvancedMarkerElement } = (await google.maps.importLibrary(
            'marker'
          )) as google.maps.MarkerLibrary;
          /*let renderer = {
            render: ({ count, position }) => {
              const priceTag = document.createElement('h2');
              priceTag.className =
                'aspect-square font-body rounded-full flex text-white bg-base-contrast items-center justify-center text-sm price-tag shadow-lg w-10 h-10';
              priceTag.textContent = count;

              return new AdvancedMarkerElement({
                position,
                map: map,
                content: priceTag,
              });
            },
					};*/

          if (slug != 'outside-of-dallas') {
            var areaBound = new google.maps.LatLngBounds();
            var latLngs = buildLatLngs(points);
            var polygon = new google.maps.Polygon({
              clickable: false,
              paths: latLngs,
              strokeColor: '#000000',
              strokeOpacity: 1,
              strokeWeight: 1,
              fillColor: '#ac1600',
              fillOpacity: 0.15,
            });
            activePolygonRef.current = polygon;
            for (var k = 0; k < latLngs.length; k++) {
              areaBound.extend(latLngs[k]);
            }
            polygon.setMap(map);
            map.fitBounds(areaBound, 0);
            // map.setCenter(areaBound.getCenter());
            // map.setZoom(15.2);
          } else {
            try {
              let activeIndex = 0;
              /*let renderer = {
                      render: ({ count, position }) => {
                        const priceTag = document.createElement('h2');
                        priceTag.className =
                          'px-1 py-1 font-body rounded-md text-xs bg-white price-tag shadow-lg max-w-[200px]';
                        priceTag.textContent = count + ' Neighborhoods';
                        return new AdvancedMarkerElement({
                          position,
                          map: map,
                          content: priceTag,
                        });
                      },
                    };*/

              for (let i = 0; i < subBoundaries.length; i++) {
                let { gallopNeighborhoodBoundaries, databaseId, title } =
                  subBoundaries[i].node;

                if (neighborhoodsActive?.includes(databaseId) || i === 0) {
                  var areaBound = new google.maps.LatLngBounds();
                  let points = gallopNeighborhoodBoundaries.split(' ');
                  var latLngs = buildLatLngs(points);
                  var polygon = new google.maps.Polygon({
                    clickable: false,
                    paths: latLngs,
                    strokeColor: i === 0 ? '#000000' : '#000000',
                    strokeOpacity: i === 0 ? 0 : 1,
                    strokeWeight: i === 0 ? 0 : 1,
                    fillColor: i === 0 ? 'transparent' : '#ac1600',
                    fillOpacity: i === 0 ? 0 : 0.15,
                  });
                  for (var k = 0; k < latLngs.length; k++) {
                    areaBound.extend(latLngs[k]);
                  }
                  polygon.setMap(map);
                  activePolygonsRef?.current?.push(polygon);
                  if (map && i === 0) {
                    map.fitBounds(areaBound, 0);
                    // map.setCenter(areaBound.getCenter());
                    // map.setZoom(15.2);
                  }
                  ///
                  if (i > 0) {
                    const priceTag = document.createElement('h2');
                    priceTag.className =
                      'px-1 py-1 font-body rounded-md text-xs bg-white price-tag shadow-lg max-w-[100px]';
                    priceTag.textContent = title;

                    var mark = new AdvancedMarkerElement({
                      position: areaBound.getCenter(),
                      map: map,
                      content: priceTag,
                    });

                    mark.addListener('click', ({ domEvent, latLng }) => {
                      state.dynamicSidebar = {
                        type: 'neighborhood',
                        id: databaseId,
                        content: subBoundaries[i].node,
                        route: path,
                      };
                      state.dynamicSidebarOpen = true;
                    });
                  }
                  ///
                  activeIndex++;
                }
              }

              /*const clusters = new MarkerClusterer({
                        map,
                        algorithm,
                        renderer,
                        markers: activeMarkers,
                      });*/
            } catch (error) {
              console.error(
                'Error loading libraries or initializing markers for neighborhoods:',
                error
              );
            }
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
        if (activePolygonRef?.current) {
          activePolygonRef.current.setMap(null);
        }

        if (activePolygonsRef?.current) {
          activePolygonsRef.current.forEach((polygon) => polygon.setMap(null));
          activePolygonsRef.current.length = 0;
        }

        if (activeMarkersRef?.current) {
          activeMarkersRef.current.forEach((marker) => (marker.map = null));
          activeMarkersRef.current.length = 0;
        }
      };
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const init = async () => {
        try {
          const { AdvancedMarkerElement } = (await google.maps.importLibrary(
            'marker'
          )) as google.maps.MarkerLibrary;
          for (let i = 0; i < mlsHomes.length; i++) {
            let { latitude, longitude, list_price, listing_key_numeric } =
              mlsHomes[i];

            if (!latitude || !longitude) {
              continue;
            }
            if (i >= 0) {
              const priceTag = document.createElement('h2');
              priceTag.className =
                'px-1 py-1 font-body rounded-md text-xs bg-primary-main text-primary-contrast price-tag shadow-lg max-w-[200px] dmh:bg-modern-primary-main';
              priceTag.textContent = convertToCurrencySystem(list_price);

              var mark = new AdvancedMarkerElement({
                position: new google.maps.LatLng(
                  parseFloat(latitude),
                  parseFloat(longitude)
                ),
                map: map,
                content: priceTag,
              });

              mark.addListener('click', ({ domEvent, latLng }) => {
                state.dynamicSidebar = {
                  type: 'mls',
                  id: listing_key_numeric,
                  content: mlsHomes[i],
                  route: path,
                };
                state.dynamicSidebarOpen = true;
              });

              activeMarkersRef.current.push(mark);
            }

            /*const clusters = new MarkerClusterer({
        map,
        algorithm,
        renderer,
        markers: activeMarkers,
      });*/
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
  }, [map, mlsHomes]);

  return null;
};

const Map = ({
  children,
  center,
  title,
  slug,
  displayBoundaries,
  neighborhoodChildren,
  neighborhoodBottomTier,
  neighborhoodMapStyle,
  setNeighborhoodMapStyle,
}) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [reset, setReset] = useState<boolean>(false);

  // useEffect(() => {
  //   const mapEle = mapRef.current;
  //   if (!mapEle) {
  //     return;
  //   }

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const m = new window.google.maps.Map(mapRef.current, {
  //             center,
  //             zoom: 12,
  //             gestureHandling: 'cooperative',
  //             zoomControl: true,
  //             mapTypeControl: true,
  //             scaleControl: true,
  //             streetViewControl: true,
  //             rotateControl: true,
  //             fullscreenControl: true,
  //             mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  //           });
  //           setMap(m);
  //           observer.unobserve(mapEle);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0,
  //     }
  //   );
  // }, []);

  useEffect(() => {
    if (mapRef.current && !map) {
      blockFontImports();

      const m = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
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

      // return () => {
      //   head.insertBefore = originalInsertBefore;
      // };
    }
  }, [mapRef, map]);
  let showMap3 = true;
  if (
    JSON.stringify(neighborhoodChildren) ===
    JSON.stringify(neighborhoodBottomTier)
  ) {
    showMap3 = false;
  }

  // useEffect(() => {
  // if (markerRef.current && !marker) {
  // const marker = new google.maps.marker.AdvancedMarkerElement();
  // setMarker(marker);
  // }
  // }, [markerRef, marker]);
  const buttonDefaults = classNames(
    'py-3 px-5 bg-base-body text-center shadow-sm flex items-center justify-center cursor-pointer w-full basis-full',
    showMap3 ? '2xl:w-1/3 2xl:basis-1/3' : '2xl:w-1/2 2xl:basis-1/2'
  );
  const mainStyle =
    'bg-secondary-main text-secondary-contrast hover:bg-secondary-light';
  const outlineStyle =
    'border-t-0 border-b-2 border-r-2 border-secondary-main text-secondary-main hover:bg-white/30 text-base';

  /*const changeMap = (m: number, map: google.maps.Map | undefined) => {
      if (map) {
        setNeighborhoodMapStyle(m);
        google.maps.event.trigger(map, 'resize');
      }
		};*/

  return (
    <>
      {displayBoundaries == 'all' && slug != 'outside-of-dallas' && (
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row static md:sticky top-16 gap-0 z-10 p-0 bg-base-body border-l-2 border-t-2 border-secondary-main">
          <span
            className={classNames(
              buttonDefaults,
              neighborhoodMapStyle === 1 ? mainStyle : outlineStyle
            )}
            onClick={() => {
              if (neighborhoodMapStyle === 1) {
                setReset(true);
              }
              setNeighborhoodMapStyle(1);
            }}
          >
            {slug === 'neighborhoods' ? 'Dallas' : title}
          </span>
          <span
            className={classNames(
              buttonDefaults,
              neighborhoodMapStyle === 2 ? mainStyle : outlineStyle
            )}
            onClick={() => {
              if (neighborhoodMapStyle === 2) {
                setReset(true);
              }
              setNeighborhoodMapStyle(2);
            }}
          >
            {neighborhoodChildren.length}{' '}
            {slug === 'neighborhoods'
              ? 'Significant Neighborhoods'
              : neighborhoodChildren.length === 1
              ? 'Neighborhood'
              : 'Neighborhoods'}
          </span>
          {showMap3 && (
            <span
              className={classNames(
                buttonDefaults,
                neighborhoodMapStyle === 3 ? mainStyle : outlineStyle
              )}
              onClick={() => {
                if (neighborhoodMapStyle === 3) {
                  setReset(true);
                }
                setNeighborhoodMapStyle(3);
              }}
            >
              {neighborhoodBottomTier.length}{' '}
              {neighborhoodBottomTier.length === 1
                ? 'Specific Neighborhood'
                : 'Specific Neighborhoods'}
            </span>
          )}
        </div>
      )}
      <div
        className={classNames(
          true &&
            '[&_.gm-style-moc]:!top-auto [&_.gm-style-moc]:!bottom-0 [&_.gm-style-moc]:!w-full [&_.gm-style-moc]:!h-[48px]',
          'mb-8 aspect-square lg:aspect-square overflow-clip'
        )}
        ref={mapRef}
      >
        {Children.map(children, (child, index) =>
          child ? cloneElement(child, { map, reset, setReset }) : child
        )}
      </div>
    </>
  );
};

export default function GoogleMap({
  slug,
  title,
  mlsHomes,
  boundaries,
  subBoundaries,
  displayHomes,
  displayBoundaries,
  neighborhoodChildren,
  neighborhoodBottomTier,
}) {
  const [neighborhoodMapStyle, setNeighborhoodMapStyle] = useState(2);
  const path = usePathname();

  displayBoundaries =
    Array.isArray(subBoundaries) &&
    subBoundaries.length < 2 &&
    displayBoundaries == 'all'
      ? 'primary'
      : displayBoundaries;
  // const markerRef = useRef<any>(null);
  // const [marker, setMarker] =
  // useState<google.maps.marker.AdvancedMarkerElement>();

  let center: any = {};

  // if (subBoundaries.length == 0) {
  // return <></>;
  // }

  if (slug == 'outside-of-dallas') {
    for (let i = 0; i < subBoundaries.length; i++) {
      boundaries += subBoundaries[i].node.gallopNeighborhoodBoundaries + '|';
    }
    boundaries = boundaries.replace(/^\||\|$/g, '');
    boundaries = boundaries.replace(/\|/g, ' ');
    subBoundaries[0].node.gallopNeighborhoodBoundaries = boundaries;
  }

  let points = boundaries.split(' ');
  if (0 in points) {
    let point = points[0].split(',');
    center = {
      lat: parseFloat(point[1]),
      lng: parseFloat(point[0]),
    };
  }

  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };

  return (
    <div className="aspect-square !max-w-none mb-14">
      <div className="relative rounded-b-none overflow-clip w-full">
        <Wrapper
          apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          render={render}
        >
          <Map
            center={center}
            title={title}
            slug={slug}
            displayBoundaries={displayBoundaries}
            neighborhoodChildren={neighborhoodChildren}
            neighborhoodBottomTier={neighborhoodBottomTier}
            neighborhoodMapStyle={neighborhoodMapStyle}
            setNeighborhoodMapStyle={setNeighborhoodMapStyle}
          >
            {!displayHomes && displayBoundaries == 'primary' && (
              <SetMapSingleNeighborhood
                key="single-neighborhood"
                points={points}
                mapStyle={neighborhoodMapStyle}
                path={path}
              />
            )}
            {!displayHomes &&
              displayBoundaries == 'all' &&
              neighborhoodMapStyle === 1 && (
                <SetMapSingleNeighborhood
                  key="single-neighborhood"
                  points={points}
                  mapStyle={neighborhoodMapStyle}
                  path={path}
                />
              )}
            {!displayHomes &&
              displayBoundaries == 'all' &&
              neighborhoodMapStyle === 2 && (
                <SetMapNeighborhoods
                  key="neighborhood-children"
                  subBoundaries={subBoundaries}
                  neighborhoodsActive={neighborhoodChildren}
                  mapStyle={neighborhoodMapStyle}
                  slug={slug}
                  center={center}
                  path={path}
                />
              )}
            {!displayHomes &&
              displayBoundaries == 'all' &&
              neighborhoodMapStyle === 3 && (
                <SetMapNeighborhoods
                  key="neighborhood-bottom-tier"
                  subBoundaries={subBoundaries}
                  neighborhoodsActive={neighborhoodBottomTier}
                  mapStyle={neighborhoodMapStyle}
                  slug={slug}
                  center={center}
                  path={path}
                />
              )}
            {displayHomes && (
              <SetMapMLSHomes
                key="mls-homes"
                points={points}
                mlsHomes={mlsHomes}
                slug={slug}
                subBoundaries={subBoundaries}
                neighborhoodsActive={neighborhoodChildren}
                path={path}
              />
            )}
          </Map>
        </Wrapper>
      </div>
    </div>
  );
}

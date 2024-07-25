'use client';

// import MLSMap from '@components/mls-map';
import GoogleMap from '@components/google-map';
import { useEffect, useState } from 'react';

export const GallopMap = ({ className, meta, props }) => {
  const [mlsData, setMlsData] = useState<any[]>(meta?.mls);

  let displayHomes =
    !props['data-homes-display'] || props['data-homes-display'] == 'show'
      ? true
      : false;
  let displayBoundaries = props['data-boundary-display']
    ? props['data-boundary-display']
    : 'primary';

  useEffect(() => {
    async function init() {
      const queryParams = new URLSearchParams({
        nhood_ids: gallopNeighborhoodIds,
        limit: '500',
        offset: '0',
      }).toString();
      const response = await fetch(
        process.env.NEXT_PUBLIC_LIVE_URL +
          '/api/mls-neighborhood-homes/?' +
          queryParams,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'force-cache',
          next: { tags: ['/mls/'] },
        }
      );
      const json = await response.json();
      if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch MLS');
      }
      if (json.data && json.data.length) {
        setMlsData(json.data);
      }
    }
    displayHomes ? init() : null;
  }, []);

  if (displayHomes && !meta?.mls) {
    return (
      <p
        key="no-mls"
        className="px-4 py-4 border-2 border-base-card bg-base-card text-base-contrast rounded-md text-center"
      >
        No MLS Object.
      </p>
    );
  }
  // console.log(meta);

  const {
    title,
    slug,
    mls,
    neighborhoodBoundaries,
    subNeighborhoodBoundaries,
    neighborhoodChildren,
    neighborhoodBottomTier,
    gallopNeighborhoodIds,
  } = meta;

  return (
    <GoogleMap
      slug={slug}
      title={title}
      mlsHomes={mlsData}
      boundaries={neighborhoodBoundaries}
      subBoundaries={subNeighborhoodBoundaries}
      displayHomes={displayHomes}
      displayBoundaries={displayBoundaries}
      neighborhoodChildren={neighborhoodChildren}
      neighborhoodBottomTier={neighborhoodBottomTier}
    />
  );
};

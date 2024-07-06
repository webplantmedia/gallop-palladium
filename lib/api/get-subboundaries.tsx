import { fetchAPI } from '@api/fetch-api';

export async function getSubBoundaries(nhood_ids: string = '', slug: any) {
  if (!nhood_ids) {
    return [];
  }

  const ids = nhood_ids.split(',');

  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetSubBoundaries($ids: [ID] = []) {
        neighborhoods(where: { in: $ids }, first: 100) {
          edges {
            node {
              databaseId
              slug
              title
              gallopNeighborhoodBoundaries
              excerpt
              featuredImage {
                node {
                  mediaDetails {
                    height
                    width
                    sizes {
                      name
                      width
                      height
                      sourceUrl
                    }
                  }
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `,
    { variables: { ids: ids } },
    slug
  );

  return data;
}

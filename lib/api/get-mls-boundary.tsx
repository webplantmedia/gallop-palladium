import { fetchAPI } from './fetch-api';

export async function getMLSBoundary({ id }) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query MyQuery2($id: ID!) {
        neighborhood(id: $id, idType: DATABASE_ID) {
          gallopNeighborhoodBoundaries
          slug
          title
        }
      }
    `,
    {
      variables: { id },
    }
  );

  return data;
}

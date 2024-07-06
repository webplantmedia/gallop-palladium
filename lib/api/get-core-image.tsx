import { fetchAPI } from './fetch-api';

export async function getCoreImage(id: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetCoreImage($id: ID!) {
        mediaItem(id: $id, idType: DATABASE_ID) {
          mediaDetails {
            width
            height
            sizes {
              name
              width
              height
            }
          }
        }
      }
    `,
    {
      variables: { id },
    }
  );

  return data;
}

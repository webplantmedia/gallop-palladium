import { fetchAPI } from './fetch-api';

export async function getGallopSinglePost(
  postId: any,
  imageId: any,
  postType: any
) {
  if (postType == 'home') {
    const data = await fetchAPI(
      /* GraphQL */
      `
        query GetGallopSinglePost($postId: ID = "", $imageId: ID = "") {
          home(id: $postId, idType: DATABASE_ID) {
            content(format: RAW)
            featuredImage {
              node {
                mediaItemUrl
                altText
                title
              }
            }
            link
            title
          }
          mediaItem(id: $imageId, idType: DATABASE_ID) {
            altText
            title
            mediaItemUrl
          }
        }
      `,
      {
        variables: { postId, imageId },
      }
    );

    return data;
  }

  return null;
}

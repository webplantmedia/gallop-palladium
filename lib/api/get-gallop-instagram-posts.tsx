import { fetchAPI } from './fetch-api';

export async function getGallopInstagramPosts() {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetGallopInstagramPosts {
        posts(
          where: {
            categoryName: "douglas-newby-insights"
            orderby: { field: DATE, order: DESC }
          }
          first: 6
        ) {
          edges {
            node {
              title
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                  title
                }
              }
              date
              excerpt
              link
            }
          }
        }
      }
    `,
    {}
  );

  return data;
}

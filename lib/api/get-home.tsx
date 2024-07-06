import { fetchAPI } from './fetch-api';

export async function getHome(slug: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      fragment HomeFields on Home {
        databaseId
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        gallopHomeNeighborhoodSlug
        gallopHomeStyleId
        content(format: RENDERED)
      }
      query HomeBySlug($id: ID!, $idType: HomeIdType!) {
        home(id: $id, idType: $idType) {
          ...HomeFields
        }
      }
    `,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    },
    slug
  );

  // Filter out the main post
  // data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  // if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

import { fetchAPI } from './fetch-api';

export async function getStyle(slug: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      fragment StyleFields on Style {
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
        gallopStyleParentSlug
        content(format: RENDERED)
      }
      query StyleBySlug($id: ID!, $idType: StyleIdType!) {
        style(id: $id, idType: $idType) {
          ...StyleFields
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

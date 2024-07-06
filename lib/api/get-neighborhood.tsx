import { fetchAPI } from './fetch-api';

export async function getNeighborhood(slug: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      fragment NeighborhoodFields on Neighborhood {
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
        content(format: RENDERED)
        gallopNeighborhoodBoundaries
        gallopNeighborhoodIsSignificant
        gallopNeighborhoodParentId
        gallopNeighborhoodIds
        gallopNeighborhoodChildren
        gallopNeighborhoodBottomTier
      }
      query NeighborhoodBySlug($id: ID!, $idType: NeighborhoodIdType!) {
        neighborhood(id: $id, idType: $idType) {
          ...NeighborhoodFields
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

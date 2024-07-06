import { fetchAPI } from './fetch-api';

export async function getArchitect(slug: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      fragment ArchitectFields on Architect {
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
        gallopArchitectParentSlug
        content(format: RENDERED)
      }
      query ArchitectBySlug($id: ID!, $idType: ArchitectIdType!) {
        architect(id: $id, idType: $idType) {
          ...ArchitectFields
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

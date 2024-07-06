import { fetchAPI } from './fetch-api';

export async function getMLS(slug: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      fragment AuthorFields on User {
        name
        firstName
        lastName
        avatar {
          url
        }
      }
      fragment PageFields on Page {
        databaseId
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            ...AuthorFields
          }
        }
        content(format: RENDERED)
      }
      fragment NeighborhoodFields on Neighborhood {
        databaseId
        slug
        title
        gallopNeighborhoodBoundaries
        gallopNeighborhoodParentId
        gallopNeighborhoodIds
        gallopNeighborhoodChildren
        gallopNeighborhoodBottomTier
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
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          ...PageFields
        }
        neighborhoods(
          where: {
            metaQuery: {
              metaArray: {
                compare: EQUAL_TO
                key: "_gallop_neighborhood_is_significant"
                value: "1"
              }
            }
          }
          first: 30
        ) {
          edges {
            node {
              ...NeighborhoodFields
            }
          }
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

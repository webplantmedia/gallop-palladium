import { fetchAPI } from './fetch-api';

export async function getPage(slug: any) {
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
        uri
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
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          ...PageFields
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

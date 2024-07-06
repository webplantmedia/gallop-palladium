import { fetchAPI } from './fetch-api';

export async function getPost(slug: any) {
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
      fragment PostFields on Post {
        databaseId
        title
        slug
        excerpt
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
        categories {
          nodes {
            slug
          }
        }
        content(format: RENDERED)
      }
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
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

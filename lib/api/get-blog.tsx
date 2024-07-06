import { fetchAPI } from './fetch-api';

export async function getBlog(
  slug: string,
  categoryName: string,
  first: number,
  last: number | null,
  after: string | null,
  before: string | null,
  paged: number
) {
  const offset = (paged - 1) * first;
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
      query PageBySlug(
        $id: ID!
        $idType: PageIdType!
        $categoryName: String
        $first: Int
        $last: Int
        $after: String
        $before: String
        $offset: Int
      ) {
        page(id: $id, idType: $idType) {
          ...PageFields
        }
        posts(
          where: {
            categoryName: $categoryName
            orderby: { field: MENU_ORDER, order: ASC }
            offsetPagination: { size: $first, offset: $offset }
          }
          first: $first
          last: $last
          after: $after
          before: $before
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
              content(format: RENDERED)
              link
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }
    `,
    {
      variables: {
        id: slug,
        idType: 'URI',
        categoryName: categoryName,
        first,
        last,
        after,
        before,
        offset,
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

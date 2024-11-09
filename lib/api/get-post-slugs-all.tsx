import { fetchAPI } from './fetch-api';

export async function getPostSlugsAll() {
  let items: any = [];
  let hasNextPage = true;
  let afterCursor = null;

  while (hasNextPage) {
    let data = await getPostSlugs(afterCursor);
    items = items.concat(data.items);
    hasNextPage = data.pageInfo.hasNextPage;
    afterCursor = data.pageInfo.endCursor;
  }

  return items;
}

async function getPostSlugs(afterCursor: string | null = null) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetAllItems($after: String = "") {
        posts(first: 100, after: $after, where: { status: PUBLISH }) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            slug
            modified
            uri
          }
        }
      }
    `,
    {
      variables: {
        after: afterCursor,
      },
    }
  );

  let { posts } = data;
  let { pageInfo, nodes: items } = posts;

  return { items, pageInfo };
}

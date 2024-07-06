import { fetchAPI } from './fetch-api';

export async function getHomeSlugsAll() {
  let items = [];
  let hasNextPage = true;
  let afterCursor = null;

  while (hasNextPage) {
    let data = await getHomeSlugs(afterCursor);
    items = items.concat(data.items);
    hasNextPage = data.pageInfo.hasNextPage;
    afterCursor = data.pageInfo.endCursor;
  }

  return items;
}

async function getHomeSlugs(afterCursor: string | null = null) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetAllHomes($after: String = "") {
        homes(first: 100, after: $after, where: { status: PUBLISH }) {
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

  let { homes } = data;
  let { pageInfo, nodes: items } = homes;

  return { items, pageInfo };
}

import { fetchAPI } from './fetch-api';

export async function getNeighborhoodSlugsAll() {
  let items = [];
  let hasNextPage = true;
  let afterCursor = null;

  while (hasNextPage) {
    let data = await getNeighborhoodSlugs(afterCursor);
    items = items.concat(data.items);
    hasNextPage = data.pageInfo.hasNextPage;
    afterCursor = data.pageInfo.endCursor;
  }

  return items;
}

async function getNeighborhoodSlugs(afterCursor: string | null = null) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetAllItems($after: String = "") {
        neighborhoods(first: 100, after: $after, where: { status: PUBLISH }) {
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

  let { neighborhoods } = data;
  let { pageInfo, nodes: items } = neighborhoods;

  return { items, pageInfo };
}

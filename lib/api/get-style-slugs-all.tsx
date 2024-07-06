import { fetchAPI } from './fetch-api';

export async function getStyleSlugsAll() {
  let items = [];
  let hasNextPage = true;
  let afterCursor = null;

  while (hasNextPage) {
    let data = await getStyleSlugs(afterCursor);
    items = items.concat(data.items);
    hasNextPage = data.pageInfo.hasNextPage;
    afterCursor = data.pageInfo.endCursor;
  }

  return items;
}

async function getStyleSlugs(afterCursor: string | null = null) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetAllItems($after: String = "") {
        styles(first: 100, after: $after, where: { status: PUBLISH }) {
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

  let { styles } = data;
  let { pageInfo, nodes: items } = styles;

  return { items, pageInfo };
}

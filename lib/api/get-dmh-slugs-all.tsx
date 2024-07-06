import { fetchAPI } from './fetch-api';

export async function getDMHSlugsAll() {
  let items = [];
  let hasNextPage = true;
  let afterCursor = null;

  while (hasNextPage) {
    let data = await getDMHSlugs(afterCursor);
    items = items.concat(data.items);
    hasNextPage = data.pageInfo.hasNextPage;
    afterCursor = data.pageInfo.endCursor;
  }

  return items;
}

async function getDMHSlugs(afterCursor: string | null = null) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetAllItems($after: String = "") {
        pages(
          after: $after
          where: { parent: "40", status: PUBLISH }
          first: 100
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            slug
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

  let { pages } = data;
  let { pageInfo, nodes: items } = pages;

  return { items, pageInfo };
}

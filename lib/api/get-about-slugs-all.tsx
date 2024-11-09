import { fetchAPI } from './fetch-api';

export async function getAboutSlugsAll() {
  let items: any = [];
  let hasNextPage = true;
  let afterCursor = null;

  while (hasNextPage) {
    let data = await getAboutSlugs(afterCursor);
    items = items.concat(data.items);
    hasNextPage = data.pageInfo.hasNextPage;
    afterCursor = data.pageInfo.endCursor;
  }

  return items;
}

async function getAboutSlugs(afterCursor: string | null = null) {
  // 34 is ID for /architecture/
  const data = await fetchAPI(
    /* GraphQL */
    `
      query GetAllItems($after: String = "") {
        pages(
          after: $after
          where: { parent: "36", status: PUBLISH }
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

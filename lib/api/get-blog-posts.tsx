import { fetchAPIBlog } from './fetch-api-blog';

export async function getBlogPosts(permalink: string = '') {
  if (permalink) {
    const obj = permalink ? permalink.split('\n') : [];
    const posts = obj.map((link) => {
      var match = /\/([^\/]+)\/$/g.exec(link);
      if (match && 1 in match) {
        return match[1];
      }
      return '';
    });

    return await fetchAPIBlog(
      /* GraphQL */
      `
        query GetBlogPosts($posts: [String] = "") {
          posts(
            where: { orderby: { field: NAME_IN, order: DESC }, nameIn: $posts }
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
                excerpt
                link
              }
            }
          }
        }
      `,
      {
        variables: { posts },
      },
      'home'
    );
  }

  return await fetchAPIBlog(
    /* GraphQL */
    `
      query GetGallopBlogPostsLatest {
        posts(
          where: { orderby: { field: MENU_ORDER, order: DESC } }
          first: 4
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
              excerpt
              link
            }
          }
        }
      }
    `,
    {},
    'home'
  );
}

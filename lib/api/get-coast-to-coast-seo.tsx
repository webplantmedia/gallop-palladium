import { fetchAPI } from './fetch-api';

export async function getCoastToCoastSeo(slug: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      fragment CoastToCoastFields on CoastToCoast {
        databaseId
        link
        uri
        slug
        seo {
          canonical
          metaDesc
          opengraphAuthor
          opengraphDescription
          metaRobotsNofollow
          metaRobotsNoindex
          metaKeywords
          opengraphImage {
            mediaItemUrl
            mediaDetails {
              height
              width
            }
            mediaType
            mimeType
          }
          opengraphModifiedTime
          opengraphPublishedTime
          title
          opengraphTitle
          opengraphSiteName
          opengraphUrl
          readingTime
          opengraphType
          opengraphPublisher
        }
      }
      query CoastToCoastBySlug($id: ID!, $idType: CoastToCoastIdType!) {
        coastToCoast(id: $id, idType: $idType) {
          ...CoastToCoastFields
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

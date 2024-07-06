import { fetchAPI } from './fetch-api';

export async function getEstate(slug: any) {
  const data = await fetchAPI(
    /* GraphQL */
    `
      fragment EstateFields on Estate {
        databaseId
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        gallopEstateParentSlug
        content(format: RENDERED)
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
              sizes(include: THUMBNAIL) {
                height
                name
                width
                sourceUrl
              }
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
      query EstateBySlug($id: ID!, $idType: EstateIdType!) {
        estate(id: $id, idType: $idType) {
          ...EstateFields
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

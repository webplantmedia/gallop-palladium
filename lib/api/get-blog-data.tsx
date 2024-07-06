import { getBlog } from './get-blog';

export async function getBlogData({
  params,
  postType,
  first,
  last,
  after,
  before,
  paged,
}) {
  const data = await getBlog(
    params?.slug,
    params?.categoryName,
    first,
    last,
    after,
    before,
    paged
  );

  if (!data?.page) {
    return {
      content: '',
      meta: {
        slug: '',
        title: '',
        featuredImage: '',
        postType: '',
        databaseId: 0,
        pageInfo: {},
      },
      seo: {},
      posts: {},
    };
  }

  let { page, posts } = data;
  let { content, slug, title, featuredImage, seo, databaseId, pageInfo } = page;

  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    pageInfo,
  };

  return { content, meta, seo, posts };
}

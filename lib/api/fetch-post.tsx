export async function fetchPost(uri = '') {
  const headers = {
    'Content-Type': 'application/json',
  };

  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/`;

  const response = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      uri: uri,
    }),
    next: { tags: [uri] },
  });

  if (response.ok) {
    const { post, seo, site } = await response.json();

    if (post) {
      const meta = {
        title: post.post_title,
        postType: post.post_type,
        databaseId: post.ID,
        ...seo,
      };

      return { post: post, meta: meta, site: site };
    }
  }

  return { post: null, meta: null, site: null };
}

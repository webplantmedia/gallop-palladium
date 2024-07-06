const API_BLOG_URL = process.env.WORDPRESS_BLOG_API_URL ?? '';

export async function fetchAPIBlogPOST(
  query = '',
  { variables }: Record<string, any> = {}
) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (process.env.WORDPRESS_BLOG_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_BLOG_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_BLOG_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

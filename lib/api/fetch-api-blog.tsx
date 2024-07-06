const API_BLOG_URL = process.env.WORDPRESS_BLOG_API_URL ?? '';

export async function fetchAPIBlog(
  query = '',
  { variables }: Record<string, any> = {},
  tag: string = 'query'
) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (process.env.WORDPRESS_BLOG_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_BLOG_AUTH_REFRESH_TOKEN}`;
  }

  query = query.replace(/\s+/g, ' ').trim();

  // Encode the GraphQL query and variables
  const params = new URLSearchParams();
  params.append('query', query);
  if (variables && Object.keys(variables).length > 0) {
    params.append('variables', JSON.stringify(variables));
  }
  const queryParams = params.toString();

  const url = `${API_BLOG_URL}?${queryParams}`; // Append query parameters to the URL

  // WPGraphQL Plugin must be enabled
  const res = await fetch(url, {
    headers,
    method: 'GET',
    // cache: 'force-cache',
    // next: { revalidate: process.env.RUN_STATIC_PARAMS == 'true' ? 3600 : 0 },
    next: { tags: [tag] },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

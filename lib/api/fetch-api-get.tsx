const API_URL = process.env.WORDPRESS_API_URL ?? '';

export async function fetchAPI(
  query = '',
  { variables }: Record<string, any> = {}
) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  query = query.replace(/\s+/g, ' ').trim();

  // Encode the GraphQL query and variables
  const queryParams = new URLSearchParams({
    query: query,
    variables: JSON.stringify(variables),
  }).toString();

  const url = `${API_URL}?${queryParams}`; // Append query parameters to the URL
  // console.log(url);

  // WPGraphQL Plugin must be enabled
  const res = await fetch(url, {
    headers,
    method: 'GET',
    // cache: 'force-cache',
    // next: { revalidate: process.env.RUN_STATIC_PARAMS == 'true' ? 3600 : 0 },
    next: { tags: ['query'] },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

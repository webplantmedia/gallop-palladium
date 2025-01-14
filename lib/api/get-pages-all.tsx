export async function getPagesAll() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/hrefs/`;

  const response = await fetch(url, {
    headers,
    method: 'POST',
  });

  if (response.ok) {
    const resp = await response.json();
    return { data: resp };
  }

  return { data: [] };
}

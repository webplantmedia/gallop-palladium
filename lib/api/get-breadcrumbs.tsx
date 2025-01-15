export async function getBreadcrumbs(id = '') {
  const headers = {
    'Content-Type': 'application/json',
  };

  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/breadcrumbs/`;

  const response = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify({ leaf_id: id }),
  });

  if (response.ok) {
    const resp = await response.json();
    return { data: resp };
  }

  return { data: [] };
}

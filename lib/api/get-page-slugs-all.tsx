export async function getPageSlugsAll() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/page-slugs-all/`;

  const response = await fetch(url, {
    headers,
    method: 'POST',
  });

  if (response.ok) {
    const resp = await response.json();
    return { pageSlugs: resp };
  }

  return { pageSlugs: [] };
}

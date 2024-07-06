export async function fetchMLSHomes(nhood_ids: string, limit: number) {
  const queryParams = new URLSearchParams({
    nhood_ids: nhood_ids,
    limit: '10',
    offset: '0',
  }).toString();

  const response = await fetch(
    process.env.NEXT_PUBLIC_LIVE_URL +
      '/api/mls-neighborhood-homes/?' +
      queryParams,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    }
  );

  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch MLS');
  }

  return json.data;
}

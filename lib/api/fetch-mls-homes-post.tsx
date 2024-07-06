export async function fetchMLSHomesPOST(nhood_ids: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_LIVE_URL + '/api/mls-neighborhood-homes/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nhood_ids }),
    }
  );

  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch MLS');
  }

  return json.data;
}

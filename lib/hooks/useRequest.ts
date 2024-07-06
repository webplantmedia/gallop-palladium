import useSWR, { SWRConfiguration } from 'swr';

// ----------------------------------------------------------------------

// Updated fetcher function using the native fetch API
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
  });

export default function useRequest(
  url: string | null,
  options?: SWRConfiguration
) {
  const { data, error, isValidating, mutate } = useSWR(url, fetcher, options);

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading: !error && !data,
  };
}

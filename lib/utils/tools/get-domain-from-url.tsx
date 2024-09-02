export function getDomainFromUrl(urlString: string) {
  try {
    const url = new URL(urlString);
    return url.hostname; // This will give you the domain (e.g., "example.com")
  } catch (error) {
    return 'domain.com';
  }
}

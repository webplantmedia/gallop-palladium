export function getUploadPath(url: string) {
  url = url
    .replaceAll(process.env.NEXT_PUBLIC_WORDPRESS_URL!, '')
    .replace('wp-content-uploads-', '');

  return url;
}

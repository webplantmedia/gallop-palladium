export function replaceWordPressUrl(link: string) {
  if (link) {
    link = link.replaceAll(
      process.env.NEXT_PUBLIC_WORDPRESS_URL!,
      process.env.NEXT_PUBLIC_LIVE_URL!
    );
  }
  return link;
}

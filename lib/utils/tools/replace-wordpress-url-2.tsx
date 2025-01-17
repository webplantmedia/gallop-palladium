export function replaceWordPressUrl2(link: string) {
  if (link) {
    link = link.replaceAll(
      process.env.NEXT_PUBLIC_WORDPRESS_URL!,
      process.env.NEXT_PUBLIC_PRODUCTION_URL!
    );
  }
  return link;
}

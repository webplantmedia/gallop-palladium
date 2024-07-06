export function replaceProductionUrl(link: string) {
  if (link) {
    link = link.replaceAll(
      process.env.NEXT_PUBLIC_PRODUCTION_URL!,
      process.env.NEXT_PUBLIC_LIVE_URL!
    );
  }
  return link;
}

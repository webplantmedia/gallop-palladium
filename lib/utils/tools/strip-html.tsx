export function stripHTML(html: string | null | undefined) {
  if (html) {
    return html.replace(/<[^>]*>?/gm, '').trim();
  }

  return '';
}

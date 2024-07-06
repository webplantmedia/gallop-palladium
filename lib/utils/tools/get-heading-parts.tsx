import { cleanHTML } from './clean-html';
import { isObject } from './is-object';
import { grabMatch } from './grab-match';
import { permalink } from './permalink';

export function getHeadingParts(html: string) {
  html = cleanHTML(html);
  let c = /<(h[1-6])[^>]*>(.*?)<\/h[1-6]>/g.exec(html);

  if (c && isObject(c) && 2 in c) {
    let id = grabMatch(/id="(.*?)"/, html);
    if (!id) {
      id = permalink(c[2]);
    }
    return { tag: c[1], content: c[2], id: id };
  }
  return { tag: '', content: '' };
}

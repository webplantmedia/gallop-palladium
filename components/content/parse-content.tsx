import { decodeHTMLEntities, permalink, stripHTML } from '@utils/tools';

export function parseContent(content: string) {
  let hasH1 = false;
  if (content) {
    content = content.replace(/(\r\n|\n|\r)/gm, '');
    if (content.match(/<h1.*>/g)) {
      hasH1 = true;
    }
  }

  let toc: any = {};
  let data: any = {};
  let captureId = false;
  let domNode: any = [];

  let matches = content && content.match(/<h[1-4][^>]*?>.*?<\/h[1-4]>/g);

  if (matches) {
    matches.map((element: string, index: number) => {
      let className = element.match(/class=['|\"](.*?)['|\"]/);
      let tagMatch = element.match(/<(h[2-3])/);
      data = {};
      if (tagMatch && tagMatch[1]) {
        let tag = tagMatch[1];
        let heading = decodeHTMLEntities(stripHTML(element));

        data.level = 3;
        if (tag == 'h1') {
          data.level = 1;
          captureId = true;
        } else if (tag == 'h2') {
          data.level = 2;
          captureId = true;
        } else if (tag == 'h3') {
          data.level = 3;
          captureId = true;
        }

        if (captureId) {
          data.name = heading;
          data.id = permalink(heading);
          toc[index] = data;
        }
      }
    });
  }

  content =
    content &&
    content.replace(
      /<h[1-6]([^>]*?>).*?<\/h[1-6]>/g,
      function (match, capture) {
        let id = capture.match(/id=['|\"](.*?)['|\"]/g);
        if (!id) {
          let heading = decodeHTMLEntities(stripHTML(match));
          let headingId = permalink(heading);
          match = match.replace(/(<h[1-6]\s)/, '$1id="' + headingId + '" ');
        }
        return match;
      }
    );

  return { content, toc, hasH1 };
}

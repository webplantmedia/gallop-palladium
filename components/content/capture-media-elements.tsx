import { onlyNumeric, permalink, getUploadPath, getSrcSet } from '@utils/tools';
import { TagAnchor } from '@components/blocks';
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export function captureMediaElements(content: string) {
  // let test: any = [];
  // test.push(content);
  // console.log(test);

  let imgs: any = [];
  if (!content) {
    return { slides: imgs };
  }

  let matches = content.match(
    /<figure[^>]*?><a[^>]*?><img[^>]*?><\/a>.*?<\/figure>/g
  );

  if (matches) {
    matches.map((element: string, index: number) => {
      let src = element.match(/href=['|\"](.*?)['|\"]/);
      let srcset = element.match(/srcset=['|\"](.*?)['|\"]/);
      let width: any = element.match(/width=['|\"](.*?)['|\"]/);
      let height: any = element.match(/height=['|\"](.*?)['|\"]/);
      let description = element.match(/<figcaption[^>]*?>(.*?)<\/figcaption>/);
      let html: any = <></>;
      if (description && description[1]) {
        const options: HTMLReactParserOptions = {
          replace(domNode) {
            if (domNode instanceof Element && domNode.attribs) {
              const props: HTMLAttributeProps = castToHTMLAttributeProps(
                domNode.attribs
              );
              let { className } = props;
              if (domNode.name === 'a') {
                return (
                  <TagAnchor
                    tag={domNode.name}
                    className={className}
                    node={domNode}
                  >
                    {domToReact(domNode.children as DOMNode[], options)}
                  </TagAnchor>
                );
              }
            }
          },
        };
        html = parse(description[1], options);
      }

      if (
        height &&
        width &&
        src &&
        src[1] &&
        srcset &&
        srcset[1] &&
        src[1].match(/\.jpe?g|png/)
      ) {
        if (width && height) {
          let widthInt = onlyNumeric(width[1]);
          let heightInt = onlyNumeric(height[1]);
          if (widthInt > heightInt) {
            heightInt = (3600 * heightInt) / widthInt;
            widthInt = 3600;
          } else {
            widthInt = (3600 * widthInt) / heightInt;
            heightInt = 3600;
          }

          let path = getUploadPath(src[1]);
          const id = permalink(path);

          let thumbnailWidth = widthInt;
          let thumbnailUrl = src[1];
          let { srcsets } = getSrcSet(srcset[1]);
          srcsets.map((s: any, index: number) => {
            if (s.width < thumbnailWidth) {
              thumbnailWidth = s.width;
              thumbnailUrl = s.src;
            }
          });

          let img = {
            src: src[1],
            width: widthInt,
            height: heightInt,
            description: <></>,
            srcset: srcsets,
            thumbnail: thumbnailUrl,
          };

          if (html) {
            img.description = html;
          }
          // console.log(img);
          imgs.push(img);
        }
      }
    });
  }

  return { slides: imgs };
}

import { replaceWordPressUrl } from './replace-wordpress-url';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export function captureVarsInHtml(html: any) {
  let href: string = '',
    heading: string = '',
    imgSrc: string = '',
    imgAlt: string = '',
    imgTitle: string = '',
    imgWidth: any = '',
    paragraph: any = [],
    imgHeight: any = '';

  html?.children.map((el: any, index2: number) => {
    const p: HTMLAttributeProps = castToHTMLAttributeProps(el.attribs);
    if (el.name === 'a') {
      href = replaceWordPressUrl(p?.href);
      el?.children.map((el2: any, index3: number) => {
        if (el2?.name === 'img') {
          const pp: HTMLAttributeProps = castToHTMLAttributeProps(el2.attribs);
          imgTitle = pp?.title;
          imgAlt = pp?.alt;
          imgSrc = pp?.src;
          imgWidth = pp?.width;
          imgHeight = pp?.height;
        }
      });
    } else if (el.name === 'h2') {
      el?.children.map((el2: any, index3: number) => {
        el2?.children.map((el3: any, index4: number) => {
          if (el3?.type === 'text') {
            heading = el3.data;
          }
        });
      });
    } else if (el.name === 'p') {
      el?.children.map((el2: any, index3: number) => {
        if (el2.data) paragraph.push(el2.data);
        el2?.children?.map((el3: any, index4: number) => {
          if (el3?.type === 'text') {
            heading = el3.data;
            if (el3.data) paragraph.push(el3.data);
          }
        });
      });
    }
  });

  const paragraphText = paragraph.join(' ');

  return {
    href,
    heading,
    imgSrc,
    imgWidth,
    imgTitle,
    imgAlt,
    imgHeight,
    paragraph: paragraphText,
  };
}

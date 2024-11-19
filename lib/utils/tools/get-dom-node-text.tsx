import { Element } from 'html-react-parser';

export function getDomNodeText(domNode: Element) {
  const text = domNode.children
    .map((child: any) => {
      if (child instanceof Element) {
        return child.children
          .map((grandChild) => {
            if (grandChild.type === 'text') {
              return grandChild.data;
            }
            return '';
          })
          .join('');
      } else {
        if (child.type === 'text') {
          return child.data;
        }
        return '';
      }
    })
    .join('');

  return text;
}

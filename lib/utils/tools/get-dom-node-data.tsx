import { Element } from 'html-react-parser';

export function getDomNodeData(node: Element) {
  if (node.children) {
    node.children.map((child) => {
      if ('data' in child) {
        return child.data;
      }
    });
  }

  return 'No Value';
}

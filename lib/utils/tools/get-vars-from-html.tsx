import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';

export function getVarsFromHTML(node: any): Record<string, any> {
  let data: Record<string, any> = {};

  const saveNestedObject = (path: string, value: any) => {
    let parts = path.split('.');
    let current = data;

    // Step 3: Iterate over parts and create nested objects
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (i === parts.length - 1) {
        current[part] = value; // Set the final value
      } else {
        if (!current[part]) {
          current[part] = {}; // Create a new object only if it doesn't exist
        }
        current = current[part]; // Move to the next level
      }
    }
  };

  const recurseNode = (block: any, name: string[]) => {
    let value: any = '';

    const props: HTMLAttributeProps = castToHTMLAttributeProps(block.attribs);

    if (hasExactClass(props.className, 'wp-block-group')) {
      name.push('wpBlockGroup');
    } else if (hasExactClass(props.className, 'wp-block-cover')) {
      name.push('wpBlockCover');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(props.className, 'wp-block-buttons')) {
      name.push('wpBlockButtons');
    } else if (hasExactClass(props.className, 'wp-block-button')) {
      name.push('wpBlockButton');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(props.className, 'wp-block-heading')) {
      name.push('wpBlockHeading');
    } else if (block.name == 'video') {
      name.push('htmlVideo');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'img') {
      name.push('htmlImg');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'a') {
      name.push('htmlA');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'p') {
      name.push('htmlP');
    } else if (block.name == 'strong') {
      name.push('htmlStrong');
    } else if (block.type === 'text' && block.data) {
      name.push('text');
      value = block.data;
      saveNestedObject(name.join('.'), value);
    }

    if (block.children) {
      block.children.map((el: any) => {
        recurseNode(el, [...name]);
      });
    }

    return;
  };

  if (node.children) {
    node.children.map((block: any) => {
      recurseNode(block, []);
    });
  }

  return data;
}

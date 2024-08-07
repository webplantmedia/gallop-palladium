import {
  hasExactClass,
  castToHTMLAttributeProps,
  printObject,
} from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';

export function getVarsFromHTML(node: any): Record<string, any> {
  let data: Record<string, any> = {};

  const saveNestedObject = (path: string, value: any) => {
    let parts = path.split('.');
    let current = data;

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];

      if (current[part]) {
        if (i === parts.length - 1) {
          // If the final part already exists, handle it as an array
          if (!Array.isArray(current[part])) {
            current[part] = [current[part]]; // Convert to array if it's not already one
          }
          current[part].push(value); // Append the new value to the array
        } else {
          // At each level, check if the current part is an array
          if (Array.isArray(current[part])) {
            current = current[part][current[part].length - 1]; // Get the last object in the array
          } else {
            current = current[part];
          }
        }
      } else {
        if (i === parts.length - 1) {
          current[part] = value; // Set the final value if it doesn't exist
        } else {
          current[part] = {}; // Create a new object only if it doesn't exist
          current = current[part]; // Move to the next level
        }
      }
    }
  };

  const recurseNode = (block: any, name: string[]) => {
    // delete block.prev;
    // delete block.next;
    // delete block.parent;

    let value: any = '';

    const props: HTMLAttributeProps = castToHTMLAttributeProps(block.attribs);

    if (hasExactClass(props.className, 'wp-block-group')) {
      name.push('wpBlockGroup');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(props.className, 'wp-block-embed')) {
      name.push('wpBlockEmbed');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(props.className, 'wp-block-cover')) {
      name.push('wpBlockCover');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(props.className, 'wp-block-buttons')) {
      name.push('wpBlockButtons');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(props.className, 'wp-block-button')) {
      name.push('wpBlockButton');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h1') {
      name.push('h1');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h2') {
      name.push('h2');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h3') {
      name.push('h3');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h4') {
      name.push('h4');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h5') {
      name.push('h5');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h6') {
      name.push('h6');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'video') {
      name.push('video');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'img') {
      name.push('img');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'iframe') {
      name.push('iframe');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'a') {
      name.push('a');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'p' && block.children?.length) {
      name.push('p');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'em' && block.children?.length) {
      name.push('em');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'strong' && block.children?.length) {
      name.push('strong');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'table' && block.children?.length) {
      name.push('table');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'tbody' && block.children?.length) {
      name.push('tbody');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'tr' && block.children?.length) {
      name.push('tr');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'td' && block.children?.length) {
      name.push('td');
      value = block.attribs;
      saveNestedObject(name.join('.'), value);
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

  // printObject(data);
  return data;
}

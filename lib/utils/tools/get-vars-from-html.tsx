import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
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

    const props: HTMLAttributeProps = castToHTMLAttributeProps(block.attribs);
    const { className } = props;
    let value: any = { ...block.attribs };

    // console.log('PROPS', block);
    if (hasExactClass(className, 'wp-block-group')) {
      name.push('wpBlockGroup');
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(className, 'wp-block-embed')) {
      name.push('wpBlockEmbed');
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(className, 'wp-block-cover')) {
      name.push('wpBlockCover');
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(className, 'wp-block-buttons')) {
      name.push('wpBlockButtons');
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(className, 'wp-block-code')) {
      name.push('wpBlockCode');
      saveNestedObject(name.join('.'), value);
    } else if (hasExactClass(className, 'wp-block-button')) {
      name.push('wpBlockButton');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h1') {
      name.push('h1');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h2') {
      name.push('h2');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h3') {
      name.push('h3');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h4') {
      name.push('h4');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h5') {
      name.push('h5');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'h6') {
      name.push('h6');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'video') {
      name.push('video');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'img') {
      name.push('img');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'iframe') {
      name.push('iframe');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'a') {
      name.push('a');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'p' && block.children?.length) {
      name.push('p');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'em' && block.children?.length) {
      name.push('em');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'strong' && block.children?.length) {
      name.push('strong');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'table' && block.children?.length) {
      name.push('table');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'tbody' && block.children?.length) {
      name.push('tbody');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'tr' && block.children?.length) {
      name.push('tr');
      saveNestedObject(name.join('.'), value);
    } else if (block.name == 'td' && block.children?.length) {
      name.push('td');
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

  return data;
}

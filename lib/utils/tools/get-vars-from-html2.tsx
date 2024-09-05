import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import {
  domToReact,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from 'html-react-parser';
import { printObject } from '@utils/tools';

export function getVarsFromHTML2(node: any): Record<string, any> {
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

  function handleNode(domNode: any, index: number, name: Array<string>) {
    name = name.slice(0, index);

    if (domNode instanceof Element && domNode.attribs) {
      const props: HTMLAttributeProps = castToHTMLAttributeProps(
        domNode.attribs
      );
      let { className } = props;
      let value: any = { ...domNode.attribs };

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
      } else if (domNode.name == 'h1') {
        name.push('h1');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'h2') {
        name.push('h2');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'h3') {
        name.push('h3');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'h4') {
        name.push('h4');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'h5') {
        name.push('h5');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'h6') {
        name.push('h6');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'video') {
        name.push('video');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'img') {
        name.push('img');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'iframe') {
        name.push('iframe');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'a') {
        name.push('a');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'p' && domNode.children?.length) {
        name.push('p');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'em' && domNode.children?.length) {
        name.push('em');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'strong' && domNode.children?.length) {
        name.push('strong');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'table' && domNode.children?.length) {
        name.push('table');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'tbody' && domNode.children?.length) {
        name.push('tbody');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'tr' && domNode.children?.length) {
        name.push('tr');
        saveNestedObject(name.join('.'), value);
      } else if (domNode.name == 'td' && domNode.children?.length) {
        name.push('td');
        saveNestedObject(name.join('.'), value);
      }
      // console.log(index, className, name);
      // printObject(data);
      domToReact(domNode.children as DOMNode[], {
        replace: (child) => handleNode(child, index + 1, name),
      });
    } else if (domNode.type === 'text') {
      name.push('text');
      const value = domNode.data;
      saveNestedObject(name.join('.'), value);
    }
    return <></>;
  }

  // const options: HTMLReactParserOptions = ;

  // Parse the node using html-react-parser
  domToReact(node.children as DOMNode[], {
    replace: (child) => handleNode(child, 0, []),
  });

  return data;
}

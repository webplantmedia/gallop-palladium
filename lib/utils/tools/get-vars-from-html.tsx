import { hasExactClass, castToHTMLAttributeProps } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import {
  domToReact,
  Element,
  // HTMLReactParserOptions,
  DOMNode,
} from 'html-react-parser';
// import { printObject } from '@utils/tools';

export function getVarsFromHTML(node: any): Record<string, any> {
  let data: Record<string, any> = {};

  const saveNestedObject = (parts: Array<string>, value: any) => {
    let current = data;

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];

      if (current[part]) {
        if (i === parts.length - 1) {
          // If the final part already exists, handle it as an array
          if (part === 'text') {
            current[part] += value; // Append the new value to the array
          } else {
            if (!Array.isArray(current[part])) {
              current[part] = [current[part]]; // Convert to array if it's not already one
            }
            current[part].push(value); // Append the new value to the array
          }
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

  const saveJSX = (domNode: any, path: Array<string>) => {
    const jsx = domToReact(domNode.children as DOMNode[]);
    path.push('jsx');
    saveNestedObject(path, jsx);
    path.pop();
  };

  function handleNode(domNode: any, index: number, path: Array<string>) {
    path = path.slice(0, index);

    if (domNode instanceof Element && domNode.attribs) {
      // const props: HTMLAttributeProps = castToHTMLAttributeProps(
      // domNode.attribs
      // );
      // let { className } = props;
      let value: any = { ...domNode.attribs };
      value.className = value.class;
      delete value.class;

      if (domNode.tagName) {
        path.push(domNode.tagName);
        saveNestedObject(path, value);
        if (domNode.name) {
          if (['h1,h2,h3,h4,h5,h6,p,a,td'].includes(domNode.name)) {
            saveJSX(domNode, path);
          }
        }
      }

      // console.log(index, className, name);
      // printObject(data);
      domToReact(domNode.children as DOMNode[], {
        replace: (child) => handleNode(child, index + 1, path),
      });
    } else if (domNode.type === 'text') {
      path.push('text');
      const value = domNode.data;
      saveNestedObject(path, value);
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

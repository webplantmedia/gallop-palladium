import React, { ReactNode, ReactElement, Children } from 'react';

import {
  domToReact,
  Element,
  // HTMLReactParserOptions,
  DOMNode,
} from 'html-react-parser';
// import { printObject } from '@utils/tools';

function getImportantClassName(classList: string) {
  // Split the class list into an array
  const classes = classList.split(' ');

  // Prioritize finding a class name that starts with "gallop-"
  let targetClass = classes.find((className: string) =>
    className.startsWith('gallop-')
  );

  // If no "gallop-" class found, look for a class name that starts with "wp-block-"
  if (!targetClass) {
    targetClass = classes.find((className: string) =>
      className.startsWith('wp-block-')
    );
  }

  // If no class name found, return an empty string
  if (!targetClass) return '';

  // Separate the prefix ("wp-" or "gallop-") and the rest of the class name
  const [prefix, ...rest] = targetClass.split('-');

  // Remove the prefix ("wp-" or "gallop-") and convert to camelCase
  const formattedClass = rest
    .join('-') // Join back the remaining parts with hyphen (if split into multiple parts)
    .split(/[-_]/) // Split by hyphen or underscore
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each subsequent word
    .join(''); // Join words together

  return `${prefix}${formattedClass}`;
}

export function getVarsFromNode(node: any): Record<string, any> {
  // console.log('\nNODE', serializer(node));

  let data: Record<string, any> = {};

  const saveNestedObject = (parts: Array<string>, value: any) => {
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

  function getTextFromJSX(jsx: ReactNode): string {
    if (typeof jsx === 'string') {
      return jsx;
    }
    if (React.isValidElement(jsx)) {
      const element = jsx as ReactElement<{ children?: ReactNode }>; // Explicitly define props type
      return Children.toArray(element.props?.children)
        .map(getTextFromJSX)
        .join('');
    }
    if (Array.isArray(jsx)) {
      return jsx.map(getTextFromJSX).join('');
    }
    return '';
  }

  const saveJSX = (path: Array<string>, domNode: any) => {
    const jsx = domToReact(domNode.children as DOMNode[]);
    path.push('jsx');
    saveNestedObject(path, jsx);
    path.pop();
    path.push('text');
    const text = getTextFromJSX(jsx);
    saveNestedObject(path, text);
    path.pop();
    // if (domNode.name) {
    // path.push('tag');
    // saveNestedObject(path, domNode.name);
    // path.pop();
    // }
  };

  function handleNode(domNode: any, index: number, path: Array<string>) {
    path = path.slice(0, index);

    if (domNode instanceof Element && domNode.attribs) {
      // const props: HTMLAttributeProps = castToHTMLAttributeProps(
      // domNode.attribs
      // );
      // let { className } = props;
      let value: any = { ...domNode.attribs };
      if (value?.class) {
        value.className = value.class;
        delete value.class;
      }

      if (domNode?.tagName) {
        let key = domNode.tagName;
        if (
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'a'].includes(
            domNode.tagName
          )
        ) {
          key = domNode.tagName;
        } else if (value.className) {
          let classKey = getImportantClassName(value.className);
          if (classKey.length) {
            key = classKey;
          }
        }
        path.push(key);
        saveNestedObject(path, value);
        if (domNode.name) {
          if (
            [
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'p',
              'a',
              'td',
              'span',
              'li',
              'em',
              'cite',
              'strong',
              'figcaption',
              'pre',
              'code',
            ].includes(domNode.name) &&
            domNode.children.length
          ) {
            saveJSX(path, domNode);
          }
        }
      }

      // console.log(index, className, name);
      // printObject(data);
      domToReact(domNode.children as DOMNode[], {
        replace: (child) => handleNode(child, index + 1, path),
      });
    } /*else if (domNode.type === 'text') {
      path.push('text');
      const value = domNode.data;
      saveNestedObject(path, value);
		}*/

    return <></>;
  }

  // const options: HTMLReactParserOptions = ;

  // Parse the node using html-react-parser
  domToReact(node.children as DOMNode[], {
    replace: (child) => handleNode(child, 0, []),
  });

  return data;
}

import { BlockProps } from '@lib/types';
import { GallopMapClient } from './gallop-map-client';
import { tailwindGetAlignClasses } from '@utils/tools';
import classNames from 'classnames';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { getDomNodeText } from '@utils/tools';

export const GallopMap = ({ node, options, className, props }: BlockProps) => {
  className = tailwindGetAlignClasses(className);
  let address: string = '';
  let zoom: number = 12;

  const op: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === 'p') {
          const text = getDomNodeText(domNode);
          const part = text.split(':');
          if (part.length === 2) {
            const key = part[0].trim().toLowerCase(); // Get the key (e.g., 'Address' or 'Zoom')
            const value = part[1].trim(); // Get the value (e.g., the address or zoom level)

            if (key === 'address') {
              address = value; // Capture the address
            } else if (key === 'zoom') {
              zoom = parseInt(value, 10); // Convert the zoom value to an integer
            }
          }
        }

        return <></>; //this prevents recursion
      }
    },
  };

  domToReact(node?.children as DOMNode[], op);

  return (
    <div className={classNames('mb-14', className)}>
      <div className="relative rounded-b-none overflow-clip w-full aspect-video h-full">
        <GallopMapClient address={address} zoom={zoom} />
      </div>
    </div>
  );
};

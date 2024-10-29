import { BlockProps } from '@lib/types';
import { GallopMapClient } from './gallop-map-client';
import { tailwindGetAlignClasses } from '@utils/tools';
import classNames from 'classnames';
import { ReactElement, isValidElement } from 'react';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { tailwindAlignClasses, getDomNodeText } from '@utils/tools';
import { CoreCodeCanvas } from '@components/blocks';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps } from '@utils/tools';

export const CoreCode = ({ node, options, className, props }: BlockProps) => {
  const alignClass = tailwindGetAlignClasses(className);
  let address: string = '';
  let heading: ReactElement | null = null;
  let description: ReactElement | null = null;
  let image: ReactElement | null = null;

  if (className?.includes('r-panel-profile')) {
    return <CoreCodeCanvas id="r-panel-profile" />;
  }

  return (
    <pre className={classNames('wp-block-code', className, alignClass)}>
      {domToReact(node?.children as DOMNode[], options)}
    </pre>
  );
};

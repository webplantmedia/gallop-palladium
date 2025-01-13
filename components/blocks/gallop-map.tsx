import { BlockProps } from '@lib/types';
import { GallopMapClient } from './gallop-map-client';
import { tailwindGetAlignClasses, getVarsFromNode2 } from '@utils/tools';
import classNames from 'classnames';
import { ReactElement, isValidElement } from 'react';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';
import { tailwindAlignClasses, getDomNodeText } from '@utils/tools';
import { HTMLAttributeProps } from '@lib/types';
import { castToHTMLAttributeProps, getAlign } from '@utils/tools';
import { Alignment } from '@components/common';

export const gallopMap = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string,
  props: HTMLAttributeProps
) => {
  const data = getVarsFromNode2(domNode);

  return <GallopMap data={data} className={className} props={props} />;
};

export const GallopMap = ({
  data,
  className,
  props,
}: {
  data: any;
  className: string;
  props: HTMLAttributeProps;
}) => {
  const { align } = getAlign(className);
  const { dataMapZoom = 12 } = props;

  const address = data?.wpBlockGroup?.h3
    ? data.wpBlockGroup.h3._text
    : '1611 Avenue L, Lubbock, TX 79413';

  return (
    <Alignment align={align} className={classNames('mb-0')}>
      <div
        className={classNames(
          'relative rounded-b-none overflow-clip w-full aspect-square lg:aspect-[16/7] h-full',
          align === 'wide' && '!rounded-2xl'
        )}
      >
        <GallopMapClient data={data} address={address} mapZoom={dataMapZoom} />
      </div>
    </Alignment>
  );
};

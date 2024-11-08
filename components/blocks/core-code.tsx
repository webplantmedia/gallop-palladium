import { BlockProps } from '@lib/types';
import { tailwindGetAlignClasses } from '@utils/tools';
import classNames from 'classnames';
import { RPanel, UPanel, ProRib, AGPanel } from '@components/three';

export const CoreCode = ({ children, className }: BlockProps) => {
  const alignClass = tailwindGetAlignClasses(className);

  if (className?.includes('r-panel-profile')) {
    return <RPanel />;
  } else if (className?.includes('u-panel-profile')) {
    return <UPanel />;
  } else if (className?.includes('pro-rib')) {
    return <ProRib />;
  } else if (className?.includes('ag-panel')) {
    return <AGPanel />;
  }

  return (
    <pre className={classNames('wp-block-code', className, alignClass)}>
      {children}
    </pre>
  );
};

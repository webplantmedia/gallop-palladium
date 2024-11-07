import { BlockProps } from '@lib/types';
import { tailwindGetAlignClasses } from '@utils/tools';
import classNames from 'classnames';
import { RPanel, UPanel } from '@components/three';

export const CoreCode = ({ children, className }: BlockProps) => {
  const alignClass = tailwindGetAlignClasses(className);

  if (className?.includes('r-panel-profile')) {
    return <RPanel />;
  } else if (className?.includes('u-panel-profile')) {
    return <UPanel />;
  }

  return (
    <pre className={classNames('wp-block-code', className, alignClass)}>
      {children}
    </pre>
  );
};

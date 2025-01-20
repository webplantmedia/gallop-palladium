import { BlockProps } from '@lib/types';
import { tailwindGetAlignClasses } from '@utils/tools';
import classNames from 'classnames';
// UPanel,
// ProRib,
// AGPanel,
// StandingSeamSSQ100,
// StandingSeamSSQ450,
// import { RPanel } from '@components/three/r-panel';

export const CoreCode = ({ children, className }: BlockProps) => {
  const alignClass = tailwindGetAlignClasses(className);

  // return <RPanel />;
  /*if (className?.includes('r-panel-profile')) {
    return <RPanel />;
  } else if (className?.includes('u-panel-profile')) {
    return <UPanel />;
  } else if (className?.includes('pro-rib')) {
    return <ProRib />;
  } else if (className?.includes('ag-panel')) {
    return <AGPanel />;
  } else if (className?.includes('standing-seam-ssq450')) {
    return <StandingSeamSSQ450 />;
  } else if (className?.includes('standing-seam-ssq100')) {
    return <StandingSeamSSQ100 />;
	}*/

  return (
    <pre className={classNames('wp-block-code', className, alignClass)}>
      {children}
    </pre>
  );
};

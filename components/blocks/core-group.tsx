import classNames from 'classnames';
import {
  CoreGroupGrid,
  CoreGroupCard1,
  CoreGroupHero1,
} from '@components/blocks';
import { hasExactClass } from '@utils/tools';
import { domToReact, DOMNode } from 'html-react-parser';

export const CoreGroup = ({ className, props, options, node }) => {
  const { id } = props;

  if (hasExactClass(className, 'wp-block-group-is-layout-grid')) {
    return (
      <CoreGroupGrid
        className={className}
        props={props}
        options={options}
        node={node}
      />
    );
  } else if (hasExactClass(className, 'is-style-hero-1')) {
    return <CoreGroupHero1 node={node} className={className} props={props} />;
  } else if (hasExactClass(className, 'is-style-card-1')) {
    return <CoreGroupCard1 node={node} className={className} props={props} />;
  }

  return (
    <div
      id={id}
      className={classNames(
        className,
        'mb-10 [&>*]:mt-0 [&>*]:mb-0 [&>*>*:first-child]:mt-0 [&>*>*:last-child]:mb-0'
      )}
    >
      {domToReact(node.children as DOMNode[], options)}
    </div>
  );
};

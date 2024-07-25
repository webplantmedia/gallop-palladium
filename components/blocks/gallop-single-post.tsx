import classNames from 'classnames';
import { domToReact, DOMNode } from 'html-react-parser';

export const GallopSinglePost = ({ children, className, id }) => {
  return (
    <div id={id} className={classNames(className)}>
      {children}
    </div>
  );
};

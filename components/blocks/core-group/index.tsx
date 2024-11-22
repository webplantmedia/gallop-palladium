import { CoreGroupSection1 } from './section-1';
import { CoreGroupSection2 } from './section-2';
import { CoreGroupSection3 } from './section-3';
import { CoreGroupGrid } from './grid';
import { CoreGroupCard1 } from './card-1';
import { CoreGroupCard2 } from './card-2';
import { CoreGroupHero1 } from './hero-1';
import { CoreGroupOurOffices } from './our-offices';
import { CoreGroup } from './default';
import { hasExactClass, getVarsFromNode, getVarsFromNode2 } from '@utils/tools';
import {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from 'html-react-parser';

export const coreGroup = (
  domNode: Element,
  options: HTMLReactParserOptions,
  className: string,
  props: any
) => {
  if (hasExactClass(className, 'wp-block-group-is-layout-grid')) {
    return (
      <CoreGroupGrid className={className} props={props}>
        {domToReact(domNode.children as DOMNode[], options)}
      </CoreGroupGrid>
    );
  } else if (hasExactClass(className, 'is-style-section-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupSection1 data={data} className={className} />;
  } else if (className?.includes('is-style-section-2')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupSection2 data={data} className={className} />;
  } else if (className?.includes('is-style-section-3')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupSection3 data={data} className={className} />;
  } else if (className?.includes('is-style-our-offices')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupOurOffices data={data} className={className} />;
  } else if (hasExactClass(className, 'is-style-hero-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupHero1 data={data} className={className} />;
  } else if (hasExactClass(className, 'is-style-card-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupCard1 data={data} className={className} props={props} />;
  } else if (hasExactClass(className, 'is-style-card-2')) {
    const data = getVarsFromNode(domNode);
    return <CoreGroupCard2 data={data} className={className} props={props} />;
  }

  return (
    <CoreGroup className={className} props={props}>
      {domToReact(domNode.children as DOMNode[], options)}
    </CoreGroup>
  );
};

import {
  CoreGroupSection1,
  CoreGroupSection2,
  CoreGroupSection3,
  CoreGroupSection4,
  CoreGroupContact1,
  CoreGroupContact2,
  CoreGroupCard1,
  CoreGroupCard2,
  CoreGroupTeam1,
  CoreGroupHero1,
  CoreGroupHero2,
  coreGroupContent1,
  CoreGroupGrid,
  CoreGroupOurOffices1,
  CoreGroupHeader1,
  CoreGroupHeader2,
} from '@components/blocks';
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
  props: any,
  parentTag?: string
) => {
  if (hasExactClass(className, 'wp-block-group-is-layout-grid')) {
    return (
      <CoreGroupGrid className={className} props={props} parentTag={parentTag}>
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
  } else if (className?.includes('is-style-section-4')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupSection4 data={data} className={className} />;
  } else if (className?.includes('is-style-contact-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupContact1 data={data} className={className} />;
  } else if (className?.includes('is-style-contact-2')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupContact2 data={data} className={className} />;
  } else if (className?.includes('is-style-our-offices-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupOurOffices1 data={data} className={className} />;
  } else if (hasExactClass(className, 'is-style-hero-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupHero1 data={data} className={className} />;
  } else if (hasExactClass(className, 'is-style-hero-2')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupHero2 data={data} className={className} />;
  } else if (hasExactClass(className, 'is-style-card-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupCard1 data={data} className={className} props={props} />;
  } else if (hasExactClass(className, 'is-style-card-2')) {
    const data = getVarsFromNode(domNode);
    return <CoreGroupCard2 data={data} className={className} props={props} />;
  } else if (hasExactClass(className, 'is-style-team-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupTeam1 data={data} className={className} props={props} />;
  } else if (className?.includes('is-style-header-2')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupHeader1 data={data} className={className} props={props} />;
  } else if (className?.includes('is-style-header-1')) {
    const data = getVarsFromNode2(domNode);
    return <CoreGroupHeader2 data={data} className={className} props={props} />;
  } else if (className?.includes('is-style-content-1')) {
    return coreGroupContent1(domNode, options, className, props);
  }

  return (
    <CoreGroup className={className} props={props}>
      {domToReact(domNode.children as DOMNode[], options)}
    </CoreGroup>
  );
};

import * as Missing from '@components/global/missing';
import classNames from 'classnames';
import { GridPattern } from '@components/widgets/grid-pattern';
import {
  Heading,
  HeadingAccent,
  Paragraph,
  Alignment,
  Container,
  Milestone,
} from '@components/common';

export const CoreGroupHero2 = ({ data, className }: any) => {
  let h1 = data?.h1?._jsx || Missing.H1();
  let h2 = data?.h2?._jsx || Missing.H2();
  let p1 = data?.p?._jsx || Missing.Paragraph();
  let p2 = data?.p_2?._jsx || Missing.Paragraph();
  let p3 = data?.p_3?._jsx || Missing.Paragraph();
  let milestone1 = data?.h4?._text;
  let milestone2 = data?.h4_2?._text;
  let milestone3 = data?.h4_3?._text;

  return (
    <Alignment align="full" className="wp-block-group py-20">
      <GridPattern
        className="!max-w-none !px-0 absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-accent/30 stroke-accent/10 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={-96}
        interactive
      />

      <Container className="flex-auto">
        <HeadingAccent as="h1">{h1}</HeadingAccent>
        <Heading
          as="h2"
          inStyle="h1"
          className={classNames('!mt-6 [text-wrap:balance] max-w-[900px]')}
        >
          {h2}
        </Heading>
        <div className={classNames('mt-6 max-w-3xl')}>
          <Paragraph as="leader">{p1}</Paragraph>
          <div className="mt-10 max-w-2xl space-y-6 text-base">
            <Paragraph>{p2}</Paragraph>
            <Paragraph>{p3}</Paragraph>
          </div>
        </div>
        <div className="max-w-7xl w-full mt-16">
          <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
            <Milestone label={milestone1} />
            <Milestone label={milestone2} />
            <Milestone label={milestone3} />
          </dl>
        </div>
      </Container>
    </Alignment>
  );
};

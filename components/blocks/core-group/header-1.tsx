import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import { Paragraph, Heading, Alignment, Container } from '@components/common';

export const CoreGroupHeader1 = ({ data, className, props }: BlockProps) => {
  let h1 = data?.h1?.jsx || Missing.H1();
  let p = data?.p?.jsx || Missing.Paragraph();

  return (
    <Alignment align="full" className="bg-accent py-24 sm:py-32">
      <Container>
        <Heading as="h1" className="text-white max-w-6xl">
          {h1}
        </Heading>
        <Paragraph as="leader" className="mt-8 text-white/50 !mb-0 max-w-5xl">
          {p}
        </Paragraph>
      </Container>
    </Alignment>
  );
};

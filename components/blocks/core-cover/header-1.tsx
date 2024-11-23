import { styleStringToObject } from '@utils/tools';
import classNames from 'classnames';
import { BlockProps } from '@lib/types';
import * as Missing from '@components/global/missing';
import {
  Paragraph,
  Heading,
  Alignment,
  Container,
  BackgroundMedia,
  Overlay2,
} from '@components/common';

const BackgroundOverlay = () => {};

export const CoreCoverHeader1 = ({ data, className, props }: BlockProps) => {
  const h1 = data?.wpBlockCoverInnerContainer?.h1?._jsx || Missing.H1();
  const p = data?.wpBlockCoverInnerContainer?.p?._jsx || Missing.Paragraph();

  return (
    <Alignment
      align="full"
      className="py-24 sm:py-32 clear-both border border-black relative isolate overflow-hidden"
    >
      <BackgroundMedia wpBlockCover={data} />
      <Overlay2 className="bg-accent/90" />
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

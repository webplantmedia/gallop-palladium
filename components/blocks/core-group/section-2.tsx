import classNames from 'classnames';
import * as Missing from '@components/global/missing';
import {
  Alignment,
  Button,
  Image,
  Container,
  Paragraph,
  Heading,
} from '@components/common';

export const CoreGroupSection2 = ({ data, className }: any) => {
  const h2 = data?.h2?._jsx || Missing.H2();
  const p = data?.p?._jsx || Missing.Paragraph();
  const button1 =
    data?.wpBlockButtons?.wpBlockButton?.a?._text || Missing.Button();
  const button2 =
    data?.wpBlockButtons?.wpBlockButton_2?.a?._text || Missing.Button();
  const button1Href = data?.wpBlockButtons?.wpBlockButton?.a?._href || null;
  const button2Href = data?.wpBlockButtons?.wpBlockButton_2?.a?._href || null;
  const attr = data?.wpBlockImage?.img;

  return (
    <Alignment
      align="full"
      className={classNames(
        'relative isolate overflow-hidden bg-gradient-to-b from-accent/10 pt-14'
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-accent/10 ring-1 ring-accent/10 sm:-mr-80 lg:-mr-96"
      />
      <Container className="py-32 sm:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <Heading
            as="h2"
            className="max-w-2xl text-balance lg:col-span-2 xl:col-auto"
          >
            {h2}
          </Heading>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <Paragraph as="large" className="[&>strong]:text-accent2">
              {p}
            </Paragraph>
            <div className="mt-10 flex flex-col items-center sm:items-start xl:items-center justify-start xl:flex-row gap-x-6 max-xl:gap-y-6">
              <Button href={button1Href}>{button1}</Button>
              <Button as="text" href={button2Href}>
                {button2} <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
          <Image
            attr={attr}
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
          />
        </div>
      </Container>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </Alignment>
  );
};

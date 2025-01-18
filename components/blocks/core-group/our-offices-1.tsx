import * as Missing from '@components/global/missing';
import PhoneIcon from '@iconify/icons-carbon/phone';
import Iconify from '@components/iconify';
import { Heading, Paragraph } from '@components/common';
import { objectMap } from '@utils/objectMap';

export const CoreGroupOurOffices1 = ({ data, className }: any) => {
  const h2 = data?.h2?._jsx || Missing.H2();
  const p = data?.p?._jsx || Missing.Paragraph();

  return (
    <div className="alignfull bg-white my-24 sm:my-32">
      <div className="mx-auto max-w-screen-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Heading as="h2" className="!mb-2 !mt-0">
            {h2}
          </Heading>
          <Paragraph as="lead" className="">
            {p}
          </Paragraph>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {data?.wpBlockGroup &&
            objectMap(data, (key, item, index) => {
              if (!key.includes('wpBlockGroup')) {
                return;
              }
              const itemH3 = item?.h3?._jsx || Missing.H3();
              const itemP = item?.p?._jsx || Missing.Paragraph();
              const itemP2 = item?.p_2?._jsx || Missing.Paragraph();
              return (
                <div key={`office-${index}`}>
                  <Heading
                    as="h3"
                    className="border-l-2 border-accent pl-6 !mb-0"
                  >
                    {itemH3}
                  </Heading>
                  <address className="border-l-2 border-gray-200 pl-6 pt-2 not-italic text-gray-600">
                    <Paragraph>{itemP}</Paragraph>
                    <Paragraph className="gallop-links [&>a]:!font-bold mt-3 flex gap-1 items-center group">
                      <Iconify
                        icon={PhoneIcon}
                        className="flex-shrink-0 h-6 w-6 text-accent relative top-0.5 group-hover:text-accent-light"
                      />
                      {itemP2}
                    </Paragraph>
                  </address>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

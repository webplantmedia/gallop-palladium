import * as Missing from '@components/global/missing';
import PhoneIcon from '@iconify/icons-carbon/phone';
import Iconify from '@components/iconify';

export const CoreGroupOurOffices = ({ data, className }: any) => {
  const h2 = data?.h2?.jsx || Missing.H2();
  const p = data?.p?.jsx || Missing.Paragraph();
  const group_h3 = data?.wpBlockGroup?.h3?.jsx || Missing.H3();
  const group_p = data?.wpBlockGroup?.p?.jsx || Missing.Paragraph();
  const group_p2 = data?.wpBlockGroup?.p_2?.jsx || Missing.Paragraph();
  const group2_h3 = data?.wpBlockGroup_2?.h3?.jsx || Missing.H3();
  const group2_p = data?.wpBlockGroup_2?.p?.jsx || Missing.Paragraph();
  const group2_p2 = data?.wpBlockGroup_2?.p_2?.jsx || Missing.Paragraph();
  const group3_h3 = data?.wpBlockGroup_3?.h3?.jsx || Missing.H3();
  const group3_p = data?.wpBlockGroup_3?.p?.jsx || Missing.Paragraph();
  const group3_p2 = data?.wpBlockGroup_3?.p_2?.jsx || Missing.Paragraph();
  const group4_h3 = data?.wpBlockGroup_4?.h3?.jsx || Missing.H3();
  const group4_p = data?.wpBlockGroup_4?.p?.jsx || Missing.Paragraph();
  const group4_p2 = data?.wpBlockGroup_4?.p_2?.jsx || Missing.Paragraph();

  return (
    <div className="alignfull bg-white my-24 sm:my-32">
      <div className="mx-auto max-w-screen-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="gallop-h2 !mb-2 !mt-0">{h2}</h2>
          <p className="gallop-lead">{p}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div>
            <h3 className="border-l-2 border-accent pl-6 gallop-h3 !mb-0">
              {group_h3}
            </h3>
            <address className="border-l-2 border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>{group_p}</p>
              <p className="gallop-links [&>a]:!font-bold mt-3 flex gap-1 items-center group">
                <Iconify
                  icon={PhoneIcon}
                  className="flex-shrink-0 h-6 w-6 text-accent relative top-0.5 group-hover:text-accent-light"
                />
                {group_p2}
              </p>
            </address>
          </div>
          <div>
            <h3 className="border-l-2 border-accent pl-6 gallop-h3 !mb-0">
              {group2_h3}
            </h3>
            <address className="border-l-2 border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>{group2_p}</p>
              <p className="gallop-links [&>a]:!no-underline [&>a]:!font-bold mt-3 flex gap-1 items-center group">
                <Iconify
                  icon={PhoneIcon}
                  className="flex-shrink-0 h-6 w-6 text-accent relative top-0.5 group-hover:text-accent-light"
                />
                {group2_p2}
              </p>
            </address>
          </div>
          <div>
            <h3 className="border-l-2 border-accent pl-6 gallop-h3 !mb-0">
              {group3_h3}
            </h3>
            <address className="border-l-2 border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>{group3_p}</p>
              <p className="gallop-links [&>a]:!font-bold mt-3 flex gap-1 items-center group">
                <Iconify
                  icon={PhoneIcon}
                  className="flex-shrink-0 h-6 w-6 text-accent relative top-0.5 group-hover:text-accent-light"
                />
                {group3_p2}
              </p>
            </address>
          </div>
          {false && (
            <div>
              <h3 className="border-l-2 border-accent pl-6 gallop-h3 !mb-0">
                {group4_h3}
              </h3>
              <address className="border-l-2 border-gray-200 pl-6 pt-2 not-italic text-gray-600">
                <p>{group4_p}</p>
                <p className="gallop-links [&>a]:!font-bold mt-3 flex gap-1 items-center group">
                  <Iconify
                    icon={PhoneIcon}
                    className="flex-shrink-0 h-6 w-6 text-accent relative top-0.5 group-hover:text-accent-light"
                  />
                  {group4_p2}
                </p>
              </address>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

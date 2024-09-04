import { getVarsFromHTML } from '@utils/tools';
import { DataIconText } from '@components/blocks';

export const GallopIconText = ({ node, className }) => {
  const data = getVarsFromHTML(node);
  return <DataIconText data={data} className={className} />;
};

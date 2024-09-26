import { getVarsFromNode } from '@utils/tools';
import { DataIconText } from '@components/blocks';

export const GallopIconText = ({ node, className }) => {
  const data = getVarsFromNode(node);
  return <DataIconText data={data} className={className} />;
};

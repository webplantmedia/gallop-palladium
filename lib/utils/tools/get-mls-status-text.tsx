export const getMLSStatusText = (val: string): string => {
  let textStatus = 'For Sale';
  switch (val) {
    case 'Active':
      textStatus = 'For Sale';
      break;
    case 'Active Contingent':
      textStatus = 'Contingent Offer Made';
      break;
    case 'Active Option Contract':
      textStatus = 'Under Contract';
      break;
    case 'Active KO':
      textStatus = 'Under Contract with Kickout Option';
      break;
    case 'Cancelled':
      textStatus = 'Cancelled';
      break;
    case 'Coming Soon':
      textStatus = 'Coming Soon';
      break;
    case 'Expired':
      textStatus = 'Expired';
      break;
    case 'Pending':
      textStatus = 'Sale Pending';
      break;
    case 'Closed':
      textStatus = 'Sold';
      break;
    case 'Hold':
      textStatus = 'Temporarily Off Market';
      break;
    case 'WS':
      textStatus = 'Withdrawn Sublisting';
      break;
    case 'Withdrawn':
      textStatus = 'Withdrawn';
      break;
    case 'Incomplete':
      textStatus = 'Incomplete';
      break;
  }

  return textStatus;
};

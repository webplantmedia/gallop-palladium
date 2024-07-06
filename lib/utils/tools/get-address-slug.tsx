export const getAddressSlug = (address, city, state) => {
  const formatAddress = address?.toLowerCase().replaceAll(' ', '-');
  const formatCity = city?.toLowerCase().replaceAll(' ', '-');
  const slug =
    formatAddress +
    '-' +
    (formatCity ? formatCity : 'dallas') +
    '-' +
    (state ? state.toLowerCase() : 'texas');
  return slug;
};

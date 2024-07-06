export const getMLSPermalink = (
  id: any,
  address: any,
  city: any,
  state: any
) => {
  function stripNonAlphaNumeric(str: string) {
    var cleaned = str.replace(/[^a-zA-Z0-9-]/g, '');
    cleaned = cleaned.replace(/-+/g, '-');

    return cleaned;
  }

  const slug = address?.toLowerCase().replaceAll(' ', '-');
  const formatCity = city?.toLowerCase().replaceAll(' ', '-');
  const link =
    '/mls/' +
    stripNonAlphaNumeric(
      id +
        '-' +
        slug +
        '-' +
        (formatCity ? formatCity : 'dallas') +
        '-' +
        (state ? state.toLowerCase() : 'texas')
    ) +
    '/';
  return link;
};

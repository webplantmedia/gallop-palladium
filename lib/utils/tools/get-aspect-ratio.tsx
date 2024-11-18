export const getAspectRatio = (className: string): string | null => {
  if (!className) {
    return null; // Return null if className is undefined or null
  }

  const regex = /wp-embed-aspect-(\d+)-(\d+)/;
  const match = className.match(regex);

  if (match && match[1] && match[2]) {
    return `${match[1]}/${match[2]}`;
  }

  return null;
};

export const getAspectRatioPadding = (className: string): string | null => {
  if (!className) {
    return null; // Return null if className is undefined or null
  }

  const regex = /wp-embed-aspect-(\d+)-(\d+)/;
  const match = className.match(regex);

  if (match && match[1] && match[2]) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);

    // Calculate padding-top as a percentage for the aspect ratio
    const paddingTop = (height / width) * 100;
    return `${paddingTop}%`;
  }

  return null;
};

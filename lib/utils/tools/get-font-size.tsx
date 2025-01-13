export const getFontSize = (str: string) => {
  const words = str.split(' ');
  let maxLength = 0;
  let className = '!text-3xl xl:!text-4xl';

  for (const word of words) {
    if (word.length > maxLength) {
      maxLength = word.length;
    }
  }

  if (maxLength >= 9) {
    className = '!text-3xl xl:!text-3xl';
  }
  if (maxLength >= 12) {
    className = '!text-3xl xl:!text-lg 2xl:!text-2xl';
  }
  if (maxLength >= 14) {
    className = '!text-3xl xl:!text-lg 2xl:!text-xl';
  }

  return className;
};

export const compressContent = (content: string | null | undefined) => {
  if (typeof content !== 'string') {
    // Handle the case where content is not a string
    content = String(content ?? ''); // Convert to an empty string if null or undefined
  }

  content = content.replace(/(\r\n|\n|\r)/gm, '');

  return content;
};

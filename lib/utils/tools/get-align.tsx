export function getAlign(
  className: string | null | undefined,
  align: string = 'content'
) {
  className = String(className);

  let justify = '';
  let textAlign = 'text-left';
  let alignment = '';

  if (className?.includes('alignright')) {
    align = 'right';
  } else if (className?.includes('aligncenter')) {
    align = 'center';
  } else if (className?.includes('alignleft')) {
    align = 'left';
  } else if (className?.includes('alignwide')) {
    align = 'wide';
  } else if (className?.includes('alignfull')) {
    align = 'full';
  }

  if (className?.includes('has-text-align-center')) {
    justify = 'justify-center';
    textAlign = 'text-center';
  } else if (className?.includes('has-text-align-left')) {
    justify = 'justify-start';
    textAlign = 'text-left';
  } else if (className?.includes('has-text-align-right')) {
    justify = 'justify-end';
    textAlign = 'text-right';
  }

  switch (align) {
    case 'full':
      alignment = 'mx-auto max-w-screen-4xl clear-both';
      break;
    case 'wide':
      alignment = 'mx-auto max-w-screen-3xl clear-both px-4 sm:px-8';
      break;
    case 'left':
      alignment =
        'text-center md:float-left md:mr-10 md:mb-10 ml-0 mr-0 px-4 sm:px-8';
      break;
    case 'right':
      alignment =
        'text-center md:float-right md:ml-10 md:mb-10 ml-0 mr-0 px-4 sm:px-8';
      break;
    case 'center':
      alignment = 'text-center mx-auto justify-center ml-0 mr-0 px-4 sm:px-8';
      break;
    case 'content':
      alignment = 'max-w-3xl px-4 sm:px-8 mx-auto';
      break;
  }

  return { align, justify, alignment, textAlign };
}

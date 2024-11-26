export function getAlign(className: string | null | undefined) {
  if (!className) {
    return { justify: '', align: '' };
  }

  let align = 'none';
  let justify = '';

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

  if (className?.includes('text-center')) {
    justify = 'justify-center';
  } else if (className?.includes('text-left')) {
    justify = 'justify-start';
  } else if (className?.includes('text-right')) {
    justify = 'justify-end';
  }

  return { align, justify };
}

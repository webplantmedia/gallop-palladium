export function tailwindGetAlignClasses(
  className: string | null | undefined
): string {
  if (!className) {
    return '';
  }

  const classList = className.split(' ');
  let updatedClasses = '';

  classList.forEach((classItem) => {
    if (classItem.startsWith('has-text-align-')) {
      updatedClasses += classItem.replace('has-text-align-', 'text-') + ' ';
    }

    if (classItem === 'aligncenter') {
      updatedClasses +=
        'aligncenter text-center mx-auto justify-center ml-0 mr-0 ';
    }

    if (classItem === 'alignleft') {
      updatedClasses +=
        'alignleft text-center md:float-left md:mr-10 md:mb-10 ml-0 mr-0 ';
    }

    if (classItem === 'alignright') {
      updatedClasses +=
        'alignright text-center md:float-right md:ml-10 md:mb-10 ml-0 mr-0 ';
    }

    if (classItem === 'alignfull') {
      updatedClasses += 'alignfull mx-auto !max-w-screen-4xl clear-both !px-0 ';
    }

    if (classItem === 'alignwide') {
      updatedClasses += 'alignwide mx-auto !max-w-screen-3xl clear-both ';
    }
  });

  return updatedClasses.trim();
}

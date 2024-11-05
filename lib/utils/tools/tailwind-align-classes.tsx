export function tailwindAlignClasses(className: string | undefined): string {
  if (!className) {
    return '';
  }

  className = className.replace('has-text-align-', 'text-');
  className = className.replace(
    'aligncenter',
    'aligncenter text-center mx-auto justify-center ml-0 mr-0'
  );
  className = className.replace(
    'alignleft',
    'alignleft text-center md:float-left md:mr-10 md:mb-10 ml-0 mr-0'
  );
  className = className.replace(
    'alignright',
    'alignright text-center md:float-right md:ml-10 md:mb-10 ml-0 mr-0'
  );
  className = className.replace(
    'alignfull',
    'alignfull mx-auto !max-w-screen-4xl clear-both !px-0'
  );
  className = className.replace(
    'alignwide',
    'alignwide mx-auto !max-w-screen-3xl clear-both'
  );

  return className;
}

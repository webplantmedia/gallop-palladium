import classNames from 'classnames';

export const CoreHeading = ({ children, tag, className = '', props }) => {
  const { id } = props;

  let h1Class =
    'mb-7 leading-tight text-4xl md:text-5xl lg:text-6xl text-base-contrast font-bold';
  let h2Class =
    'mb-2 leading-tight text-3xl md:text-4xl text-primary-main mt-14';
  let h3Class =
    'mb-1 leading-tight text-2xl text-base-contrast small-caps font-medium dmh:font-accent dmh:normal-case dmh:variant-normal dmh:mb-2';
  let h4Class =
    'mb-7 leading-tight text-base-contrast font-medium text-base small-caps';
  let h5Class = 'mb-7 leading-tight';
  let h6Class = 'mb-7 leading-tight';

  let hClass = '';

  if (className?.includes('is-style-quote-title')) {
    let quoteClass =
      'leading-tight text-3xl md:text-4xl lg:text-5xl text-base-contrast small-caps text-right text-base-contrast mb-7 dmh:xl:text-4xl dmh:text-3xl pl-8 md:pl-20';
    if (tag) {
      switch (tag) {
        case 'h1':
          return (
            <h1 key={id} id={id} className={classNames(quoteClass, className)}>
              {children}
            </h1>
          );
        case 'h2':
          return (
            <h2 key={id} id={id} className={classNames(quoteClass, className)}>
              {children}
            </h2>
          );
        case 'h3':
          return (
            <h3 key={id} id={id} className={classNames(quoteClass, className)}>
              {children}
            </h3>
          );
        case 'h4':
          return (
            <h4 key={id} id={id} className={classNames(quoteClass, className)}>
              {children}
            </h4>
          );
        case 'h5':
          return (
            <h5 key={id} id={id} className={classNames(quoteClass, className)}>
              {children}
            </h5>
          );
        case 'h6':
          return (
            <h6 key={id} id={id} className={classNames(quoteClass, className)}>
              {children}
            </h6>
          );
      }
    }
  }

  if (className?.includes('is-style-h1')) {
    hClass = h1Class;
  }
  if (className?.includes('is-style-h2')) {
    hClass = h2Class;
  }
  if (className?.includes('is-style-h3')) {
    hClass = h3Class;
  }

  if (tag) {
    switch (tag) {
      case 'h1':
        return (
          <h1
            key={id}
            id={id}
            className={classNames(hClass ? hClass : h1Class, className)}
          >
            {children}
          </h1>
        );
      case 'h2':
        return (
          <h2
            key={id}
            id={id}
            className={classNames(hClass ? hClass : h2Class, className)}
          >
            {children}
          </h2>
        );
      case 'h3':
        return (
          <h3
            key={id}
            id={id}
            className={classNames(hClass ? hClass : h3Class, className)}
          >
            {children}
          </h3>
        );
      case 'h4':
        return (
          <h4
            key={id}
            id={id}
            className={classNames(hClass ? hClass : h4Class, className)}
          >
            {children}
          </h4>
        );
      case 'h5':
        return (
          <h5
            key={id}
            id={id}
            className={classNames(hClass ? hClass : h5Class, className)}
          >
            {children}
          </h5>
        );
      case 'h6':
        return (
          <h6
            key={id}
            id={id}
            className={classNames(hClass ? hClass : h6Class, className)}
          >
            {children}
          </h6>
        );
    }
  }

  return <></>;
};

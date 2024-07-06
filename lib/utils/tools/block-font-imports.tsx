export const blockFontImports = () => {
  const head = document.getElementsByTagName('head')[0];

  const originalInsertBefore = head.insertBefore.bind(head);

  head.insertBefore = function <T extends Node>(
    newElement: T,
    referenceElement: Node | null
  ): T {
    if (
      newElement instanceof HTMLLinkElement &&
      newElement.href.includes('//fonts.googleapis.com/css?family=Roboto')
    ) {
      return newElement;
    }

    if (
      newElement instanceof HTMLLinkElement &&
      newElement.href.includes(
        '//fonts.googleapis.com/css?family=Google+Sans+Text'
      )
    ) {
      return newElement;
    }

    return originalInsertBefore(newElement, referenceElement);
  };
};

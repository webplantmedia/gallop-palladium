export const CoreSeparator = ({ props }: any) => {
  const { id } = props;
  return (
    <hr
      id={id}
      className="mt-16 mb-16 md:mt-20 md:mb-20 border-base-contrast/70 dmh:border-modern-primary-main"
    />
  );
};

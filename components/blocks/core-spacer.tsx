export const CoreSpacer = ({ props, className }: any) => {
  const { style } = props;
  return <div style={{ height: style.height }} className={className} />;
};

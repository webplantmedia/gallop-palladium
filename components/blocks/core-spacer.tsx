export const CoreSpacer = ({ props, className }) => {
  const { style } = props;
  return <div style={{ height: style.height }} className={className} />;
};

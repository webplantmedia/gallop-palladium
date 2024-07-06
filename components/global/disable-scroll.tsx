import { Global } from '@emotion/react';

export default function DisableScroll() {
  return (
    <Global
      styles={{
        html: {
          overflow: 'hidden',
        },
      }}
    />
  );
}

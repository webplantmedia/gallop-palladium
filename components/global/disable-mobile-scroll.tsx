import { Global } from '@emotion/react';

export default function DisableMobileScroll() {
  return (
    <Global
      styles={{
        html: {
          '@media (max-width: 1180px)': {
            overflow: 'hidden',
          },
        },
      }}
    />
  );
}

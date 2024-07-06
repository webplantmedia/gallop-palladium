'use client';

// icons
import { Icon, IconifyIcon } from '@iconify/react';

// ----------------------------------------------------------------------

interface Props {
  icon: IconifyIcon;
  [other: string]: any;
}

export default function Iconify({ icon, ...other }: Props) {
  return <Icon icon={icon} {...other} />;
}

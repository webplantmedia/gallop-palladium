'use client';

import pencilSolidIcon from '@iconify/icons-heroicons/pencil-solid';
import eyeIcon from '@iconify/icons-heroicons/eye';
import arrowPath20Solid from '@iconify/icons-heroicons/arrow-path-20-solid';
import Iconify from '@components/iconify';
import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
// import { clearCache } from '@components/actions/clear-cache';
import { state, useSnapshot } from '@state';

export default function EditLink({ meta }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const snap = useSnapshot(state);

  if (!snap.isLoggedIn) {
    return <></>;
  }

  const { databaseId } = meta;

  const handleRevalidate = async () => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch('/api/revalidate/', {
      headers,
      method: 'POST',
      body: JSON.stringify({
        path: pathname,
      }),
    });
    const data = await response.json();

    if (data.revalidated) {
      setDialogMessage('Page revalidated successfully!');
    } else {
      setDialogMessage('Failed to revalidate the page.');
    }
    setIsDialogOpen(true);
    setTimeout(() => {
      setIsDialogOpen(false); // Close the dialog after 3 seconds
      router.refresh();
    }, 500);
  };

  return (
    <>
      <div className="hidden w-12 h-12 lg:flex items-center justify-center">
        <button
          onClick={handleRevalidate}
          className="rounded-full bg-primary-main hover:bg-primary-light w-12 h-12 flex items-center justify-center dmh:bg-modern-primary-main dmh:hover:bg-modern-primary-light"
        >
          <Iconify className="w-6 h-6 text-white" icon={arrowPath20Solid} />
        </button>
      </div>
      {databaseId !== 0 && (
        <>
          <div className="hidden w-12 h-12 lg:flex items-center justify-center">
            <a
              href={
                'https://dougnewby1.wpenginepowered.com/' +
                (meta.postType !== 'page' ? meta.postType + '/' : '') +
                (meta.slug !== 'home' ? meta.slug + '/' : '')
              }
              target="_blank"
              className="rounded-full bg-primary-main hover:bg-primary-light w-12 h-12 flex items-center justify-center dmh:bg-modern-primary-main dmh:hover:bg-modern-primary-light"
            >
              <Iconify className="w-6 h-6 text-white" icon={eyeIcon} />
            </a>
          </div>
          <div className="hidden w-12 h-12 lg:flex items-center justify-center">
            <a
              href={
                process.env.NEXT_PUBLIC_WORDPRESS_URL +
                '/wp-admin/post.php?post=' +
                databaseId +
                '&action=edit'
              }
              target="_blank"
              className="rounded-full bg-primary-main hover:bg-primary-light w-12 h-12 flex items-center justify-center dmh:bg-modern-primary-main dmh:hover:bg-modern-primary-light"
            >
              <Iconify className="w-6 h-6 text-white" icon={pencilSolidIcon} />
            </a>
          </div>
        </>
      )}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Dialog panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-sm rounded bg-white p-6 shadow-lg">
            <DialogTitle className="text-lg font-medium">
              {dialogMessage}
            </DialogTitle>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

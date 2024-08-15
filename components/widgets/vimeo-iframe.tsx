import React from 'react';

export function VimeoEmbed({ vimeoUrl }: { vimeoUrl: string }) {
  try {
    // Parse the Vimeo URL
    const url = new URL(vimeoUrl);
    const pathParts = url.pathname.split('/');
    const videoId = pathParts[1]; // Extract the video ID
    const hash = pathParts[2] || ''; // Extract the hash if it exists

    // Construct the Vimeo embed URL
    let embedUrl = `https://player.vimeo.com/video/${videoId}`;
    if (hash) {
      embedUrl += `?h=${hash}`;
    }

    // Return the iframe as a JSX component
    return (
      <iframe
        src={embedUrl}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } catch (error) {
    console.error('Invalid Vimeo URL:', error);
    return null;
  }
}

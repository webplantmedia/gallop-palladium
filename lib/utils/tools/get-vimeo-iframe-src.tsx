export function getVimeoIframeSrc(vimeoUrl: string): string {
  try {
    // Parse the Vimeo URL
    const url = new URL(vimeoUrl);
    const pathParts = url.pathname.split('/');

    // Extract the video ID and hash (if present)
    const videoId = pathParts[1]; // Extract the video ID
    const hash = pathParts[2] || ''; // Extract the hash if it exists

    // Construct the iframe src URL
    let embedUrl = `https://player.vimeo.com/video/${videoId}`;
    if (hash) {
      embedUrl += `?h=${hash}`;
    }

    return embedUrl;
  } catch (error) {
    console.error('Invalid Vimeo URL:', error);
    return '';
  }
}

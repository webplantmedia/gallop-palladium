import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  // Get the tag from the query parameters, which should be the page pathname
  const { path } = await req.json();

  if (!path) {
    return new NextResponse(
      JSON.stringify({ revalidated: false, message: 'No path provided' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  let tag = 'query';
  if (path) {
    if (path === '/') {
      tag = '/home/';
    } else if (path.includes('/home/')) {
      tag = path;
    } else {
      tag = path;
    }
  }
  // console.log('Tag', tag);
  // console.log('Path', path);
  // if (path2) {
  // console.log('Path2', path2);
  // }
  try {
    revalidateTag(tag);
    revalidateTag('site-element');
    revalidatePath(path);

    // console.log(tag);
    // console.log(path);
    return new NextResponse(
      JSON.stringify({ revalidated: true, now: Date.now() }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(
      JSON.stringify({ revalidated: false, errorMessage }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

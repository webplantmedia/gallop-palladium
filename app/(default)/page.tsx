import type { Metadata } from 'next';
import Content from '@components/content';
import GridFull from '@components/grid-full';

export const revalidate = 3600;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {};
}

export default async function Page({ params }) {
  const uri = '/home/';
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/`,
    {
      headers,
      method: 'POST',
      body: JSON.stringify({
        uri: uri,
      }),
      next: { tags: [uri] },
    }
  );

  if (response.ok) {
    const { post, seo } = await response.json();

    const meta = {
      title: post.post_title,
      ...seo,
    };

    return (
      <GridFull>
        <Content post={post} meta={meta} />
      </GridFull>
    );
  }
}

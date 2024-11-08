import type { Metadata } from 'next';
import Content from '@components/content';
import Grid from '@components/grid';

export const revalidate = 3600;

type Props = {
  params: { slug: Array<string> };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const uri = `/${params.slug.join('/')}/`;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ uri }),
    }
  );

  if (response.ok) {
    const { seo } = await response.json();
    return {
      title: seo?.title || 'Default Title',
      description: seo?.description || 'Default Description',
      openGraph: {
        title: seo?.ogTitle || 'OpenGraph Title',
        description: seo?.ogDescription || 'OpenGraph Description',
      },
    };
  }

  return { title: 'Fallback Title' };
}

export default async function Page({ params }: Props) {
  const uri = `/${params.slug.join('/')}/`;
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

    if (post) {
      const meta = {
        title: post?.post_title,
        postType: post?.post_type,
        databaseId: post?.ID,
        ...seo,
      };

      return <Content post={post} meta={meta} />;
    }
  }
}

import type { Metadata } from 'next';
import Content from '@components/content';
import Grid from '@components/grid';

export const revalidate = 3600;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {};
}

export default async function Page({ params }: Props) {
  const uri = `/contact/`;
  // const uri = `/${params.slug.join('/')}/`;
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/?uri=` +
      uri
    // {
    //   headers,
    //   method: 'POST',
    //   body: JSON.stringify({
    //     uri: uri,
    //   }),
    //   next: { tags: [uri] },
    // }
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
  } else {
    return <p>Not found</p>;
  }
}

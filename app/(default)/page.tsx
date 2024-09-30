import type { Metadata } from 'next';
import Content from '@components/content';
import { PageSeo } from '@components/seo/page';
import { replaceWordPressUrl } from '@utils/tools';
import { fetchSiteElements } from '@api/fetch-site-elements';

export const revalidate = 3600;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const uri = '/home/';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        uri: uri,
      }),
      next: { tags: [uri] },
    }
  );

  if (response.ok) {
    const { seo, site } = await response.json();
    site.permalink = replaceWordPressUrl(site.permalink).replace('/home/', '/');
    return PageSeo(seo, site.permalink);
  }
  return {};
}

export default async function Page({ params }: Props) {
  const uri = '/home/';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
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
        title: post.post_title,
        postType: post.post_type,
        databaseId: post.ID,
        ...seo,
      };

      return <Content post={post} meta={meta} />;
    }
  }
}

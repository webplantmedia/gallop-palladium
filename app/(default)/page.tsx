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

export default async function Page({ params }) {
  const headers = {
    'Content-Type': 'application/json',
  };

  console.log(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/`
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gallop/v1/post/`,
    {
      headers,
      method: 'POST',
      body: JSON.stringify({
        uri: '/home/',
      }),
    }
  );

  // if (response.ok) {
  // const json = response.json();
  // console.log(json);
  // }

  return (
    <Grid>
      <p>Hello</p>
    </Grid>
  );
}

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

export default async function Page({ searchParams }) {
  return (
    <Grid>
      <p>Hello</p>
    </Grid>
  );
}

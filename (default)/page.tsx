import type { Metadata } from 'next';

export const revalidate = 3600;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {};
}

export default async function Page({ searchParams }) {
  return <p>Hello</p>;
}

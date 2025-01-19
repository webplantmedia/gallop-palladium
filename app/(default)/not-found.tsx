import { Alignment, Heading, Button } from '@components/common';

export default function NotFound() {
  return (
    <article className="main-content pt-20 pb-96">
      <Alignment align="wide" className="flex justify-center">
        <Heading as="h1" className="">
          Page Not Found
        </Heading>
      </Alignment>
      <Alignment align="wide" className="flex justify-center">
        <Button as="outline" href="/" className="">
          Return Home
        </Button>
      </Alignment>
    </article>
  );
}

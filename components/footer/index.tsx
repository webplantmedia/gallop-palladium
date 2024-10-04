import FooterColumns from './columns';

export default function Footer({ post }: { post: any }) {
  return (
    <footer
      className="w-full bg-secondary-main"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-screen-3xl px-4 sm:px-8 mx-auto">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <FooterColumns post={post} />
      </div>
    </footer>
  );
}

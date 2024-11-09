import { permalink } from '@utils/tools';

export default function H1({ meta }: any) {
  const { title } = meta;

  return (
    <h1
      key={permalink(title)}
      id={permalink(title)}
      className="mb-7 leading-tight text-4xl md:text-5xl lg:text-6xl text-white small-caps mx-auto !max-w-none dmh:text-modern-primary-main dmh:uppercase dmh:variant-normal dmh:tracking-widest dmh:2xl:text-5xl dmh:text-4xl"
    >
      {title}
    </h1>
  );
}

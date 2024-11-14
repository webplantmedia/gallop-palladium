import { permalink } from '@utils/tools';

export default function H1({ title }: any) {
  return (
    <h1
      key={permalink(title)}
      id={permalink(title)}
      className="mb-7 leading-tight text-5xl md:text-6xl lg:text-7xl text-base-contrast font-bold !max-w-screen-3xl"
    >
      {title}
    </h1>
  );
}

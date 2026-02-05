
export type LineFactory = (line: number) => React.ReactNode;

export interface LetterProps {
  lineFactory: LineFactory;
  imgSrc?: string;
  [prop: string]: any;
}

export default function Letter({ lineFactory, imgSrc, ...props }: LetterProps) {
  return (
    <div
      id='letter'
      {...props}
    >
      {Array.from({ length: 4 }, (_, i) => lineFactory(i))}
      <img
        src={imgSrc}
        draggable={false}
      />
    </div>
  );
}

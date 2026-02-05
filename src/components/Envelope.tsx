

export interface EnvelopeProps {
  children?: React.ReactNode;
  envelopeTopFlapRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Envelope({ children, envelopeTopFlapRef }: EnvelopeProps) {
  return (
    <div
      className='envelope'
    >
      {children}
      <div 
        className='envelope-flap left'
      />
      <div 
        className='envelope-flap right'
      />
      <div 
        className='envelope-flap bottom'
      />
      <div 
        ref={envelopeTopFlapRef}
        className='envelope-flap top'
      />
    </div>
  );
}
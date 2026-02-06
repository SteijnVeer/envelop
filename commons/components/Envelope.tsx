import './Envelope.css';

export interface EnvelopeProps {
  children?: React.ReactNode;
  [prop: string]: any;
}

export default function Envelope({ children, ...props }: EnvelopeProps) {
  return (
    <div
      {...props}
      className={`envelope ${props.className ?? ''}`.trim()}
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
        className='envelope-flap top closed'
      />
      <div 
        className='envelope-flap top opened'
      />
    </div>
  );
}

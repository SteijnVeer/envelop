import { useRef } from 'react';
import addIcon from '../assets/add.svg';
import useAnimation from '../hooks/useAnimation';

export default function Open() {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const envelopeTopFlapRef = useRef<HTMLDivElement>(null);
  const [startFadeOutOpenButtonAnimation] = useAnimation({
    name: 'animate-fade-out',
    durationMs: 500,
    elements: [openButtonRef],
  });
  const [startMoveLetterAnimation] = useAnimation({
    name: 'animate-slide-up',
    durationMs: 1000,
    elements: [letterRef],
  });
  const [startOpenEnvelopeAnimation] = useAnimation({
    name: 'animate-open',
    durationMs: 1000,
    elements: [envelopeTopFlapRef],
    onStart: startFadeOutOpenButtonAnimation,
    onEnd: startMoveLetterAnimation
  });

  return (
    <body
      id='open-page'
      className='full-size flex-center'
    >
      <main
        className='flex-center column'
      >
        <div
          id='envelope'
        >
          <div
            id='letter'
            ref={letterRef}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <p key={index}>
                This is line {index + 1} of the letter.
              </p>
            ))}
          </div>
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
        <button
          id='open-button'
          ref={openButtonRef}
          className='button'
          onClick={startOpenEnvelopeAnimation}
        >
          Open
        </button>
      </main>
      <div
        id='write-link-container'
        className='button'
      >
        <a
          href='/schrijf'
          className='full-size flex-center'
        >
          <img
            src={addIcon}
            className='full-size'
          />
        </a>
      </div>
    </body>
  );
}

import { useRef } from 'react';
import addIcon from '../assets/add.svg';
import { IMG_OPTIONS } from '../commons';
import Envelope from '../components/Envelope';
import Letter from '../components/Letter';
import useAnimation from '../hooks/useAnimation';
import useDecodedMessage from '../hooks/useDecodedMessage';

export default function Open() {
  const [message, theme, img] = useDecodedMessage();
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
      data-theme={theme}
    >
      <main
        className='flex-center column'
      >
        <Envelope
          envelopeTopFlapRef={envelopeTopFlapRef}
        >
          <Letter
            lineFactory={line => (
              <p
                key={`message-line-${line}`}
              >
                {message[line]}
              </p>
            )}
            imgSrc={IMG_OPTIONS[img]}
            ref={letterRef}
          />
        </Envelope>
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
        data-color='accent'
      >
        <a
          href='/schrijf'
          className='full-size flex-center'
        >
          <img
            src={addIcon}
            className='full-size'
            draggable={false}
          />
        </a>
      </div>
    </body>
  );
}

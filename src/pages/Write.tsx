import { useState } from 'react';
import { IMGS, IMG_OPTIONS, type Message, type MessagePart, THEMES, emptyMessage } from '../commons';
import Envelope from '../components/Envelope';
import Letter from '../components/Letter';
import RadioGroup from '../components/RadioGroup';
import useEncodedMessage, { encodeString } from '../hooks/useEncodedMessage';
import { getVersionFromLocation } from '../hooks/useLocation';
import useRadioGroupValue from '../hooks/useRadioGroupValue';

function focusInputElement(line: number) {
  document.getElementById(`message-line-${line}`)?.focus();
}

export default function Write() {
  const [messageLines, setMessageLines] = useState(emptyMessage);
  const setMessageLine = (line: number, value: string) => setMessageLines(prev => {
    const newMessage = [...prev];
    newMessage[line] = value as MessagePart;
    return newMessage as Message;
  });
  const encodedMessage = useEncodedMessage(messageLines);
  const theme = useRadioGroupValue('theme');
  const img = useRadioGroupValue('img');
  const openPath = !(theme && img && encodedMessage)
    ? null
    : `open/${encodeString(theme)}/${encodeString(img)}/${encodedMessage}`;
  const version = getVersionFromLocation();
  const origin = window.location.origin;

  const openLink = openPath === null
    ? null
    : version === null
    ? `${origin}/${openPath}`
    : `${origin}/v${version}/${openPath}`;

  const handleKeyDownOnInput = (line: number, key: string) => {
    if (key === 'ArrowUp' && line > 0)
      focusInputElement(line - 1);
    else if ((key === 'ArrowDown' || key === 'Enter') && line < 3)
      focusInputElement(line + 1);
  };

  return (
    <body
      id='write-page'
      className='full-size flex-center column'
    >
      <Letter
        lineFactory={line => (
          <input
            type='text'
            id={`message-line-${line}`}
            key={`message-line-${line}`}
            name={`message-line-${line}`}
            maxLength={24}
            value={messageLines[line]}
            onChange={e => setMessageLine(line, e.target.value)}
            onKeyDown={e => handleKeyDownOnInput(line, e.key)}
          />
        )}
      />

      <RadioGroup
        name='theme'
        values={THEMES}
        required
        labelFactory={value => [
          <Envelope />,
          { 'data-theme': value, }
        ]}
        className='flex-center row wrap'
      />

      <RadioGroup
        name='img'
        values={IMGS}
        required
        labelFactory={value => [
          <img
            src={IMG_OPTIONS[value]}
            draggable={false}
          />
        ]}
        className='flex-center row wrap'
      />

      <div>
        <a
          href={openLink ?? undefined}
          target='_blank'
        >
          Open jouw envelop
        </a>
        <button
          onClick={() => {
            navigator.clipboard.writeText(openLink ?? '');
          }}
        >
          Link kopiëren
        </button>
      </div>
    </body>
  );
}

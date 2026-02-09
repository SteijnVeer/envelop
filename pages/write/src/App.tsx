import Envelope from '@components/Envelope';
import Letter from '@components/Letter';
import RadioGroup from '@components/RadioGroup';
import { IMGS, IMG_OPTIONS, MAX_MESSAGE_LENGTH, PARAMS_ALIASES, THEMES } from '@constants';
import { allParamsDefined, encodeParams } from '@hooks/useParams';
import useRadioGroupValue from '@hooks/useRadioGroupValue';
import { createLink } from '@hooks/useRedirect';
import useTextInputValue, { getTextInputElement } from '@hooks/useTextInputValue';

function focusMessageLineInputElement(line: number) {
  getTextInputElement(`message-line-${line}`)?.focus();
}

export default function App() {
  const params = {
    theme: useRadioGroupValue('theme'),
    img: useRadioGroupValue('img'),
    messageLine0: useTextInputValue('message-line-0') || ' ',
    messageLine1: useTextInputValue('message-line-1') || ' ',
    messageLine2: useTextInputValue('message-line-2') || ' ',
    messageLine3: useTextInputValue('message-line-3') || ' ',
  };

  const canCreateOpenLink = allParamsDefined(params);
  const openLink = canCreateOpenLink
    ? createLink('open', encodeParams(PARAMS_ALIASES, params))
    : null;

  const handleKeyDownOnMessageLineInput = (line: number, key: string) => {
    if (key === 'ArrowUp' && line > 0)
      focusMessageLineInputElement(line - 1);
    else if ((key === 'ArrowDown' || key === 'Enter') && line < 3)
      focusMessageLineInputElement(line + 1);
  };

  return (
    <body
      className='full-size flex center column'
    >
      <Letter
        lineFactory={line => (
          <input
            key={`message-line-${line}`}
            type='text'
            name={`message-line-${line}`}
            className='line'
            maxLength={MAX_MESSAGE_LENGTH}
            onKeyDown={e => handleKeyDownOnMessageLineInput(line, e.key)}
          />
        )}
      />
      
      <RadioGroup
        name='theme'
        className='flex center row wrap'
        values={THEMES}
        required
        labelFactory={value => [(
          <Envelope />
        ), {
          'data-theme': value,
        }]}
      />

      <RadioGroup
        name='img'
        className='flex center row wrap'
        values={IMGS}
        required
        labelFactory={value => [(
          <img
            src={IMG_OPTIONS[value]}
            draggable={false}
            alt={value}
          />
        ), {}]}
      />

      <button
        type='button'
        className='button'
        data-theme='blue'
        data-color='accent'
        disabled={!canCreateOpenLink}
        onClick={() => {
          if (canCreateOpenLink)
            navigator.clipboard.writeText(openLink!);
        }}
      >
        Kopier link naar jouw envelop
      </button>
    </body>
  );
}

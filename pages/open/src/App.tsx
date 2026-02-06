import Envelope from '@components/Envelope';
import Letter from '@components/Letter';
import { IMG_OPTIONS, MAX_MESSAGE_LENGTH, PARAMS_ALIASES, THEMES } from '@constants';
import useParams, { allParamsProvided } from '@hooks/useParams';
import useRedirect from '@hooks/useRedirect';

export default function App() {
  const params = useParams(PARAMS_ALIASES);
  const { theme, img, messageLine0, messageLine1, messageLine2, messageLine3 } = params as Record<string, string>;
  const redirect = useRedirect('home');
  if (!allParamsProvided(params)
    || !(img in IMG_OPTIONS)
    || !THEMES.includes(theme)
    || messageLine0.length > MAX_MESSAGE_LENGTH
    || messageLine1.length > MAX_MESSAGE_LENGTH
    || messageLine2.length > MAX_MESSAGE_LENGTH
    || messageLine3.length > MAX_MESSAGE_LENGTH
  ) redirect();
  const imgSrc = IMG_OPTIONS[img];

  const handleOpenButtonClick = () => {
    document.body.setAttribute('data-open', 'true');
  };
  const handleCloseButtonClick = () => {
    document.body.setAttribute('data-open', 'false');
  };

  return (
    <body
      className='full-size flex center column'
      data-theme={theme}
      data-open={false}
    >
      <Envelope>
        <Letter
          lineFactory={line => (
            <p
              key={`message-line-${line}`}
              className='line'
            >
              {params[`messageLine${line}` as keyof typeof params]}
            </p>
          )}
          imgSrc={imgSrc}
        />
      </Envelope>

      <div
        className='flex center row wrap'
      >
        <button
          id='close-button'
          className='button'
          data-color='accent'
          onClick={handleCloseButtonClick}
        >
          Close
        </button>
        <button
          id='open-button'
          className='button'
          data-color='accent'
          onClick={handleOpenButtonClick}
        >
          Open
        </button>
      </div>
    </body>
  );
}

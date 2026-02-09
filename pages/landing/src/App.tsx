import errorImgSrc from '@assets/icon/circle-x.svg';
import Envelope from '@components/Envelope';
import Letter from '@components/Letter';
import { MAX_MESSAGE_LENGTH } from '@constants';
import { useErrorParams } from '@hooks/useParams';
import useRedirect from '@hooks/useRedirect';

function splitErrorToLines(error: null): null;
function splitErrorToLines(error: any): string[];
function splitErrorToLines(error: any): string[] | null {
  if (error === null)
    return null;
  const words: string[] = ['Error', 'code', `${error.code}.`, ...error.reason.split(' ')];
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    const newLine = `${currentLine} ${word}`.trim();
    if (newLine.length > MAX_MESSAGE_LENGTH) {
      lines.push(currentLine);
      currentLine = word;
    } else
      currentLine = newLine;
  }
  if (currentLine)
    lines.push(currentLine);
  return lines;
}

export default function App() {
  const toWrite = useRedirect('write');
  const error = useErrorParams();
  const errorMessageLines = splitErrorToLines(error);

  return (
    <body
      className='full-size flex center column'
    >
      {errorMessageLines?.length && (
        <Envelope
          data-theme='red'
          className='error-envelope'
        >
          <Letter
            lineFactory={line => (
              <p
                key={`error-message-line-${line}`}
                className='line'
              >
                {errorMessageLines[line] ?? ' '}
              </p>
            )}
            imgSrc={errorImgSrc}
          />
        </Envelope>
      )}
      <button
        type='button'
        className='button'
        data-theme='blue'
        data-color='accent'
        onClick={toWrite}
      >
        Schrijf nu een bericht!
      </button>
    </body>
  );
}

import { useMemo } from 'react';
import type { Message, MessagePart } from '../commons';
import useLocation from './useLocation';

const emptyPart: MessagePart = ' ' as MessagePart;

export function decodeMessage(encodedMessage: string): Message {
  try {
    const decodedString = atob(decodeURIComponent(encodedMessage));
    const messageParts = decodedString.split('`').map(part => part || emptyPart) as Message;
    if (messageParts.length !== 4)
      throw new Error('Invalid message length');
    return messageParts;
  } catch {
    return [emptyPart, emptyPart, emptyPart, emptyPart];
  }
}

export function decodeString(encodedValue: string): string {
  try {
    return atob(decodeURIComponent(encodedValue));
  } catch {
    return encodedValue ?? '';
  }
}

export default function useDecodedMessage(): [Message, string, string] {
  const path = useLocation();
  return useMemo(() => {
    const [_, encodedTheme, encodedImg, encodedMessage] = path.split('/');
    return [
      decodeMessage(encodedMessage),
      decodeString(encodedTheme),
      decodeString(encodedImg)
    ];
  }, [path]);
}

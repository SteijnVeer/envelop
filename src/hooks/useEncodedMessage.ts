import type { Message } from '../commons';

export default function useEncodedMessage(...messageParts: Message): string;
export default function useEncodedMessage(message: Message): string;
export default function useEncodedMessage(...m: Message | [Message]): string {
  const message = Array.isArray(m[0])
    ? m[0]
    : (m as Message);
  const urlSafeMessage = new URLSearchParams({
    m: btoa(message.join('`'))
  }).toString().slice(2);
  return urlSafeMessage;
}

export function encodeString(value: string): string {
  return btoa(value);
}

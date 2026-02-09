export const IMG_OPTIONS: Record<string, string> = {
  'heart-a': '/stamp/heart-a.svg',
  'heart-b': '/stamp/heart-b.svg',
  'bouquet-a': '/stamp/bouquet-a.svg',
  'bouquet-b': '/stamp/bouquet-b.svg',
  'bouquet-c': '/stamp/bouquet-c.svg',
  'face-with-hearts': '/stamp/face-with-hearts.svg',
  'relieved-face': '/stamp/relieved-face.svg',
  'winking-face': '/stamp/winking-face.svg',
  'cow': '/stamp/cow.svg',
  'whale': '/stamp/whale.svg',
  'cactus': '/stamp/cactus.svg',
  'present': '/stamp/present.svg',
} as const;
export const IMGS: string[] = Object.keys(IMG_OPTIONS);

export const THEMES: string[] = ['pink', 'red', 'blue', 'green', 'orange'] as const;

export type Range<N extends number, Acc extends number[] = []> =
  Acc['length'] extends N
    ? Acc[number]
    : Range<N, [...Acc, Acc['length']]>;
export type MessagePart = string & { length: Range<25> };
export type Message = [MessagePart, MessagePart, MessagePart, MessagePart];

export const emptyValue: MessagePart = '' as MessagePart;
export const emptyMessage: Message = [emptyValue, emptyValue, emptyValue, emptyValue];
export const MAX_MESSAGE_LENGTH = 24;

export const PARAMS_ALIASES = {
  theme: 't',
  img: 'i',
  messageLine0: 'a',
  messageLine1: 'b',
  messageLine2: 'c',
  messageLine3: 'd',
} as const;

export const ROUTES = {
  home: '/',
  write: '/schrijf/',
  open: '/open/',
} as const;

export const ERROR_ALIASES = {
  code: 'c',
  reason: 'r',
} as const;

export const ERRORS = {
  INVALID_PARAMS: {
    code: '400',
    reason: 'Kan bericht niet openen: Ongeldige parameters.',
  },
  PAGE_NOT_FOUND: {
    code: '404',
    reason: 'De pagina die je probeert te bezoeken bestaat niet.',
  },
} as const;

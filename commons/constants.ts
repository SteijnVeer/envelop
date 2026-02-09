import heartAImg from './assets/stamp/heart-a.svg';
import heartBImg from './assets/stamp/heart-b.svg';

import bouquetAImg from './assets/stamp/bouquet-a.svg';
import bouquetBImg from './assets/stamp/bouquet-b.svg';
import bouquetCImg from './assets/stamp/bouquet-c.svg';

import faceWithHeartsImg from './assets/stamp/face-with-hearts.svg';
import relievedFaceImg from './assets/stamp/relieved-face.svg';
import winkingFaceImg from './assets/stamp/winking-face.svg';

import cowImg from './assets/stamp/cow.svg';
import whaleImg from './assets/stamp/whale.svg';

import cactusImg from './assets/stamp/cactus.svg';
import presentImg from './assets/stamp/present.svg';

export const IMG_OPTIONS: Record<string, string> = {
  'heart-a': heartAImg,
  'heart-b': heartBImg,
  'bouquet-a': bouquetAImg,
  'bouquet-b': bouquetBImg,
  'bouquet-c': bouquetCImg,
  'face-with-hearts': faceWithHeartsImg,
  'relieved-face': relievedFaceImg,
  'winking-face': winkingFaceImg,
  'cow': cowImg,
  'whale': whaleImg,
  'cactus': cactusImg,
  'present': presentImg,
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

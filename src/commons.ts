import heartImg from './assets/heart.svg';

export const THEMES: string[] = ['pink', 'red', 'blue', 'green', 'orange'] as const;

export const IMG_OPTIONS: Record<string, string> = {
  heart0: heartImg,
  heart1: heartImg,
  heart2: heartImg,
} as const;
export const IMGS: string[] = Object.keys(IMG_OPTIONS);

export type Range<N extends number, Acc extends number[] = []> =
  Acc['length'] extends N
    ? Acc[number]
    : Range<N, [...Acc, Acc['length']]>;
export type MessagePart = string & { length: Range<25> };
export type Message = [MessagePart, MessagePart, MessagePart, MessagePart];

export const emptyValue: MessagePart = '' as MessagePart;
export const emptyMessage: Message = [emptyValue, emptyValue, emptyValue, emptyValue];

import type { RefObject } from 'react';
import { useState } from 'react';

export const ANIMATION_STATE = {
  IDLE: 'IDLE',
  ANIMATING: 'ANIMATING',
  COMPLETED: 'COMPLETED',
} as const;

export type AnimationState = typeof ANIMATION_STATE[keyof typeof ANIMATION_STATE];

export interface UseAnimationOptions {
  name: string;
  durationMs?: number;
  elements?: RefObject<HTMLElement | null>[];
  onStart?: () => void;
  onEnd?: () => void;
}

export default function useAnimation({ name, durationMs = 1000, elements = [], onStart, onEnd }: UseAnimationOptions): [() => void, AnimationState] {
  const [animationState, setAnimationState] = useState<AnimationState>(ANIMATION_STATE.IDLE);
  const startAnimation = () => {
    if (animationState !== ANIMATION_STATE.IDLE)
      return;
    setAnimationState(ANIMATION_STATE.ANIMATING);
    onStart?.();
    for (const element of elements)
      element.current?.classList.add(name);
    setTimeout(() => {
      setAnimationState(ANIMATION_STATE.COMPLETED);
      onEnd?.();
    }, durationMs);
  }
  return [startAnimation, animationState];
}

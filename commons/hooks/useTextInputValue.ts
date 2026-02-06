import { useEffect, useState } from 'react';

export function getTextInputElement(name: string): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>(`input[name='${name}']`);
}

export default function useTextInputValue(name: string): string | null {
  const [value, setValue] = useState<string | null>(null);
  const updateValue = (newValue: string | undefined) => {
    const val = newValue ?? null;
    if (val !== value)
      setValue(val);
  };

  useEffect(() => {
    const inputElement = getTextInputElement(name);
    updateValue(inputElement?.value);
    const handleInput = (event: Event) => {
      updateValue((event.target as HTMLInputElement).value);
    };
    inputElement?.addEventListener('input', handleInput);
    return () => {
      inputElement?.removeEventListener('input', handleInput);
    };
  }, [name]);

  return value;
}

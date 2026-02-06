import { useState } from 'react';

export default function useRadioGroupValue(name: string): string | null {
  const [value, setValue] = useState<string | null>(null);
  const updateValue = (newValue: string | undefined) => {
    const val = newValue ?? null;
    if (val !== value)
      setValue(val);
  };

  updateValue(
    document
    .querySelector<HTMLInputElement>(`input[name='${name}-option']:checked`)
    ?.value
  );

  return value;
}

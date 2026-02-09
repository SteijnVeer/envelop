import { useEffect, useState } from 'react';

export default function useRadioGroupValue(name: string): string | null {
  const [value, setValue] = useState<string | null>(() => document
    .querySelector<HTMLInputElement>(`input[name='${name}-option']:checked`)
    ?.value ?? null
  );

  useEffect(() => {
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.name === `${name}-option`)
        setValue(target.value);
    };
    document.addEventListener('change', handleChange);
    return () => {
      document.removeEventListener('change', handleChange);
    };
  }, [name]);

  return value;
}

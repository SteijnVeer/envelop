import { useCallback } from 'react';

export function createLink(path: `/${string}`, query?: '' | `?${string}`): string {
  return `${window.location.origin}${path}${query ?? ''}`;
}

export default function useRedirect(path: `/${string}`, query?: '' | `?${string}`): () => void {
  const redirect = useCallback(() => {
    window.location.href = createLink(path, query);
  }, [path, query]);
  return redirect;
}

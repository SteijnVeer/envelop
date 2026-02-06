import { useCallback } from 'react';
import { ROUTES } from '../constants';

export function createLink(route: keyof typeof ROUTES, query?: string): string {
  return `${window.location.origin}${ROUTES[route]}${query?.length ? query.startsWith('?') ? query : `?${query}` : ''}`;
}

export default function useRedirect(route: keyof typeof ROUTES, query?: string): () => void {
  const redirect = useCallback(() => {
    window.location.href = createLink(route, query);
  }, [route, query]);
  return redirect;
}

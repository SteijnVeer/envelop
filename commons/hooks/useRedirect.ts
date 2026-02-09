import { useCallback } from 'react';
import { ERRORS, ERROR_ALIASES, ROUTES } from '../constants';
import { setParams } from './useParams';

export function createLink(route: keyof typeof ROUTES, query?: string): string {
  return `${window.location.origin}${ROUTES[route]}${query?.length ? query.startsWith('?') ? query : `?${query}` : ''}`;
}

export default function useRedirect(route: keyof typeof ROUTES, query?: string): () => void {
  const redirect = useCallback(() => {
    window.location.href = createLink(route, query);
  }, [route, query]);
  return redirect;
}

export function useErrorRedirect(Error: keyof typeof ERRORS): () => void {
  return useRedirect('home', setParams(ERROR_ALIASES, ERRORS[Error]));
}

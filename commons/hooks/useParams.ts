import { useEffect, useState } from 'react';

export function decodeParams<V extends string, S extends string>(searchParams: URLSearchParams, alias: Record<V, S>): Record<V, string | null> {
  const params: Record<string, string | null> = {};
  for (const [variableName, searchParam] of Object.entries(alias) as [V, S][]) {
    const value = searchParams.get(searchParam);
    params[variableName] = value === null
      ? null
      : atob(value.replace(/-/g, '+').replace(/_/g, '/'));
  }
  return params;
}

export default function useParams<V extends string, S extends string>(alias: Record<V, S>): Record<V, string | null> {
  const searchParams = new URLSearchParams(window.location.search);
  const [params, setParams] = useState<Record<V, string | null>>(decodeParams(searchParams, alias));
  useEffect(() => {
    setParams(decodeParams(searchParams, alias));
  }, [searchParams.toString(), JSON.stringify(alias)]);
  return params;
}

export function allParamsProvided<V extends string>(params: Record<V, string | null>): params is Record<V, string> {
  return Object.values(params).every(value => typeof value === 'string');
}

export function encodeParams<V extends string, S extends string>(alias: Record<V, S>, params: Record<V, string | null | undefined>): '' | `?${string}` {
  const searchParams = new URLSearchParams();
  for (const [variableName, searchParam] of Object.entries(alias) as [V, S][]) {
    const value = params[variableName];
    if (value !== null && value !== undefined)
      searchParams.set(searchParam, btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
  }
  const queryString = searchParams.toString();
  return queryString.length > 0
    ? `?${queryString}`
    : '';
}

export function allParamsDefined<V extends string>(params: Record<V, string | null | undefined>): params is Record<V, string> {
  return Object.values(params).every(value => typeof value === 'string');
}

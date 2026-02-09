import { useEffect, useState } from 'react';
import { ERROR_ALIASES } from '../constants';

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

type Alias<V extends string, S extends string> = Record<V, S>;

type Params<V extends string = string, T extends string | null | undefined = string | null | undefined> = Record<V, T>;
type ParamsString<V extends string = string> = Params<V, string>;
type ParamsNullable<V extends string = string> = Params<V, string | null>;
type ParamsUndefinedable<V extends string = string> = Params<V, string | null | undefined>;

export function decodeParams<V extends string, S extends string>(searchParams: URLSearchParams, alias: Alias<V, S>): ParamsNullable<V> {
  const params = {} as ParamsNullable<V>;
  for (const [variableName, searchParam] of Object.entries(alias) as [V, S][]) {
    const value = searchParams.get(searchParam);
    params[variableName] = value === null
      ? null
      : atob(value.replace(/-/g, '+').replace(/_/g, '/'));
  }
  return params;
}

export function getParams<V extends string, S extends string>(searchParams: URLSearchParams, alias: Alias<V, S>): ParamsNullable<V> {
  const params = {} as ParamsNullable<V>;
  for (const [variableName, searchParam] of Object.entries(alias) as [V, S][])
    params[variableName] = searchParams.get(searchParam);
  return params;
}

export default function useParams<V extends string, S extends string>(alias: Alias<V, S>, decode: boolean = true): ParamsNullable<V> {
  const searchParams = new URLSearchParams(window.location.search);
  const mapFunction = decode ? decodeParams : getParams;
  const [params, setParams] = useState<ParamsNullable<V>>(mapFunction(searchParams, alias));
  useEffect(() => {
    setParams(mapFunction(searchParams, alias));
  }, [searchParams.toString(), JSON.stringify(alias), decode]);
  return params;
}

export function useErrorParams(): ParamsString<keyof typeof ERROR_ALIASES> | null {
  const params = useParams(ERROR_ALIASES, false);
  return allParamsProvided(params)
    ? params
    : null;
}

export function allParamsProvided<V extends string>(params: ParamsNullable<V>): params is ParamsString<V> {
  return Object.values(params).every(isString);
}

export function setParams<V extends string, S extends string>(alias: Alias<V, S>, params: ParamsUndefinedable<V>): string {
  const searchParams = new URLSearchParams();
  for (const [variableName, searchParam] of Object.entries(alias) as [V, S][]) {
    const value = params[variableName];
    if (isString(value))
      searchParams.set(searchParam, value);
  }
  const queryString = searchParams.toString();
  return queryString.length > 0
    ? `?${queryString}`
    : '';
}

export function encodeParams<V extends string, S extends string>(alias: Alias<V, S>, params: ParamsUndefinedable<V>): string {
  const encodedParams = Object.fromEntries(
    Object.entries(params)
      .map(([key, value]) => [
        key,
        isString(value)
          ? btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
          : null
      ])
  ) as ParamsNullable<V>;
  return setParams(alias, encodedParams);
}

export function allParamsDefined<V extends string>(params: ParamsUndefinedable<V>): params is ParamsString<V> {
  return Object.values(params).every(isString);
}

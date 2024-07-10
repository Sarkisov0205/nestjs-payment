// eslint-disable-next-line @typescript-eslint/ban-types
export function importAll<T = Function>(
  r: __WebpackModuleApi.RequireContext,
): () => T[] {
  const cache: Record<string, Record<string, T>> = {};
  r.keys().forEach((key: string) => {
    cache[key] = r(key);
  });
  return () => Object.values(cache).flatMap((v) => Object.values(v));
}

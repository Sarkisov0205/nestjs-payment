/* eslint-disable @typescript-eslint/ban-types */
const cache: Record<string, Record<string, Function>> = {};

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(require.context('./', false, /^.*\.entity\.ts$/));

const getAllEntities: () => Function[] = () =>
  Object.values(cache).map((v) => Object.values(v)[0]);
export default getAllEntities;

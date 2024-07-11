// eslint-disable-next-line @typescript-eslint/ban-types
export const getRepositoryToken = (repository: Function): string => {
  if (repository === null) {
    throw new TypeError('Argument is not a constructor');
  }
  return `${repository.name}Repository`;
};

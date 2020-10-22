export const nameof = <T extends object>(obj: T) =>
  new Proxy<T>(obj, {
    get(_, key) {
      return key;
    },
  });

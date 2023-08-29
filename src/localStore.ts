import { writable } from 'svelte/store';

export const localStore = (key: string, initial: Object) => {
  const toString = (value: any) => JSON.stringify(value, null, 2);
  const toObj = JSON.parse;

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(initial));
  }

  const saved = toObj(localStorage.getItem(key)!);
  const { subscribe, set, update } = writable(saved);

  return {
    subscribe,
    set: (value: any) => {
      localStorage.setItem(key, toString(value));
      return set(value);
    },
    update,
  }
}

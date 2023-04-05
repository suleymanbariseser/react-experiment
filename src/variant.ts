import { useSyncExternalStore } from "react";

export const variant = (name: string) => {
  let value: string | undefined = undefined;
  const subscribers = new Set<(newValue: string) => void>();
  
  return {
    name,
    get: () => value,
    set: (newValue: string) => {
      value = newValue;
      subscribers.forEach((callback) => callback(newValue));
    },
    subscribe: (callback: (newValue: string) => void) => {
      subscribers.add(callback);

      return () => subscribers.delete(callback);
    },
  };
};

export const useVariant = (variant: any) => {
    return [useSyncExternalStore(variant.subscribe, variant.get), variant.set];
}
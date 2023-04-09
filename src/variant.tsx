import * as React from 'react';

export const variant = (name: string) => {
  let value: string | undefined = undefined;
  const subscribers = new Set<(newValue: string) => void>();

  return {
    name,
    get: () => value,
    set: (newValue: string) => {
      value = newValue;
      subscribers.forEach(callback => callback(newValue));
    },
    subscribe: (callback: (newValue: string) => void) => {
      subscribers.add(callback);

      return () => subscribers.delete(callback);
    },
  };
};

export type VariantType = ReturnType<typeof variant>;

export const useVariant = (variant: any) => {
  return [
    React.useSyncExternalStore(variant.subscribe, variant.get),
    variant.set,
  ];
};

interface Props {
  name: string;
  children: React.ReactNode;
}

export const Variant = ({ name, children }: Props) => {
  return <React.Fragment key={name}>{children}</React.Fragment>;
};

import * as React from 'react';

export type ExperimentType = {
  get: (name: string) => () => string | undefined;
  set: (name: string) => (value: string) => void;
  subscribe: (name: string) => (callback: any) => () => void;
};

const experiment = (): ExperimentType => {
  const variants = new Map<string, string>();

  const subscribers = new Map<string, Set<any>>();

  return {
    get: (name: string) => () => {
      return variants.get(name);
    },
    set: (name: string) => (value: string) => {
      variants.set(name, value);

      if (subscribers.has(name)) {
        subscribers.get(name)?.forEach(callback => callback(value));
      }
    },
    subscribe: (name: string) => (callback: any) => {
      // if it is not first usage then do not initialize new set of subscribers
      if (subscribers.has(name)) {
        const variantSubscribers = subscribers.get(name);

        if (
          typeof variantSubscribers !== 'object' ||
          !('add' in variantSubscribers)
        ) {
          throw new Error('Invalid subscriber');
        }

        variantSubscribers.add(callback);
      } else {
        subscribers.set(name, new Set([callback]));
      }

      return () => {
        if (subscribers.get(name)?.size === 1) {
          subscribers.delete(name);
        } else {
          subscribers.get(name)?.delete(callback);
        }
      };
    },
  };
};

const ExperimentContext = React.createContext<React.RefObject<ExperimentType>>({
  current: null,
});

interface ProviderProps {
  children: React.ReactNode;
}
export const ExperimentProvider = ({ children }: ProviderProps) => {
  const experimentRef = React.useRef(experiment());

  return (
    <ExperimentContext.Provider value={experimentRef}>
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperiment = () => {
  return React.useContext(ExperimentContext);
};

export const useVariant = (
  name: string
): [string | undefined, (value: string) => void] => {
  const $exp = useExperiment();

  return [
    React.useSyncExternalStore(
      $exp.current!.subscribe(name),
      $exp.current!.get(name)
    ),
    $exp.current!.set(name),
  ];
};

export const useSetVariant = (name: string) => {
  const $exp = useExperiment();

  return $exp.current!.set(name);
};

interface VariantProps {
  name: string;
  children: React.ReactNode;
}

export const Variant = ({ name, children }: VariantProps) => {
  return <React.Fragment key={name}>{children}</React.Fragment>;
};

const isVariant = (
  child: React.ReactNode
): child is React.ReactElement<{ name: string }> => {
  const variantChild = child as React.ReactElement<{ name: string }>;

  if (
    'props' in variantChild &&
    'name' in variantChild.props &&
    variantChild.type === Variant
  ) {
    return true;
  }

  return false;
};
interface ExperimentProps {
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
}
export const Experiment = ({
  name,
  children,
  defaultValue,
}: ExperimentProps) => {
  const [value] = useVariant(name);

  const activeValue = value ?? defaultValue;

  const activeChild = React.Children.toArray(children).find(child => {
    if (!React.isValidElement) throw new Error('Invalid children');

    if (isVariant(child)) {
      return child.props.name === activeValue;
    }

    console.warn('Invalid child');

    return false;
  });

  return <>{activeChild}</>;
};

import * as React from 'react';
import { Variant, VariantType, useVariant } from './variant';

type VariantChild = {
  name: string
}

const isVariant = (child: React.ReactNode): child is React.ReactElement<VariantChild> => {
  const variantChild = child as React.ReactElement<VariantChild>;

  if('props' in variantChild && 'name' in variantChild.props && variantChild.type === Variant) {
    return true;
  }

  return false;
}

interface Props {
  variant: VariantType;
  children: React.ReactNode;
  defaultValue?: string
}

export const Experiment = ({ variant, children, defaultValue }: Props) => {
  const [value] = useVariant(variant);

  const activeValue = value ?? defaultValue;

  const activeChild = React.Children.toArray(children).find((child) => {
    if(!React.isValidElement) throw new Error('Invalid children');

    if(isVariant(child)) {
      return child.props.name === activeValue
    }

    console.warn('Invalid child');

    return false;
  })

  return <>{activeChild}</>;
};

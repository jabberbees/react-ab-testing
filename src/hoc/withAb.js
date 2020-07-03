import React from 'react';
import { useAb } from '..';

export default function withAb(WrappedComponent) {
  const AbWrapper = props => {
    const ab = useAb();
    return <WrappedComponent ab={ab} {...props} />;
  }

  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  AbWrapper.displayName = `withAb(${name})`;
  AbWrapper.WrappedComponent = WrappedComponent;

  return AbWrapper;
};

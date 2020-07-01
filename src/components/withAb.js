import React from 'react';

import { AbReactContext } from './Context';

export default function withAb(WrappedComponent) {
  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class AbWrapper extends React.Component {
    static contextType = AbReactContext;
    static displayName = `withAb(${name})`;
    static WrappedComponent = WrappedComponent;

    render() {
      const ab = this.context;

      return <WrappedComponent ab={ab} {...this.props} />;
    }
  }

  return AbWrapper;
};

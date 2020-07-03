import React from 'react';

const AbReactContext = /*#__PURE__*/ React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  AbReactContext.displayName = 'AbReactContext';
}

export default AbReactContext;

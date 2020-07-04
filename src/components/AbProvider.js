import React from 'react';
import PropTypes from 'prop-types';
import AbReactContext from '../hooks/Context';

function AbProvider({ ab, children }) {
    const contextValue = ab;

    return <AbReactContext.Provider value={contextValue}>{children}</AbReactContext.Provider>;
}

if (process.env.NODE_ENV !== 'production') {
    AbProvider.propTypes = {
        ab: PropTypes.object,
        children: PropTypes.any
    }
}

export default AbProvider;

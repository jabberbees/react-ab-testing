import React from 'react';
import PropTypes from 'prop-types';
import {ab} from '../ab';

export class AbTestVariant extends React.PureComponent {
    
    render() {
        const {experiment, variant, visible, forced} = this.props;
        const activeVariant = ab.activeVariant(experiment);
        const variantMatches = (variant === activeVariant) || forced;

        if (visible && variantMatches) {
            return this.props.children;
        }
        
        return null;
    }
}

AbTestVariant.propTypes = {
    experiment: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    forced: PropTypes.bool
}

AbTestVariant.defaultProps = {
    experiment: '',
    variant: '',
    visible: true,
    forced: false
}

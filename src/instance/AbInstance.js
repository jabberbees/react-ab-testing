import { AbConfiguration } from '../configuration/AbConfiguration';

export class AbInstance {
    constructor() {
        this._configuration = new AbConfiguration();
    }

    configuration() {
        return this._configuration;
    }

    configure() {
        this._configuration.__start(this);
        return this._configuration;
    }

    activeVariant(experimentName) {
        return this._variants[experimentName] || '';
    }

    variantMap() {
        return this._variants;
    }

    // private

    __onConfigurationDone() {
        this._variants = {};
        const experiments = this._configuration.experiments();
        for (var i = 0; i < experiments.length; i++) {
            const experiment = experiments[i];
            const variant = experiment.chooseRandomVariant();
            if (variant) {
                this._variants[experiment.name()] = variant.name();
            }
        }
    }
};

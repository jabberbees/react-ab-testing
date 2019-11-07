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
        return this._variantMap[experimentName] || '';
    }

    variantMap() {
        return this._variantMap || {};
    }

    clearVariantMap() {
        this._variantMap = {};
        return this;
    }

    setVariantMap(variantMap) {
        this._variantMap = variantMap || {};
        return this;
    }

    loadVariantMap(key, storage) {
        this._variantMap = this.__storageGetObject(key, storage);

        const experiments = this._configuration.experiments();

        for (var i = 0; i < experiments.length; i++) {
            const experiment = experiments[i];
            const variant = experiment.forcedVariant();
            if (variant) {
                this._variantMap[experiment.name()] = variant.name();
            }
        }

        return this;
    }

    saveVariantMap(key, storage) {
        this.__storageSetObject(key, this.variantMap(), storage);
        return this;
    }

    removeSavedVariantMap(key, storage) {
        storage = storage || window.localStorage;
        storage.removeItem(key) || {};
        return this;
    }
    
    randomiseVariants() {
        const experiments = this._configuration.experiments();

        for (var i = 0; i < experiments.length; i++) {
            const experiment = experiments[i];
            const variantName = this._variantMap[experiment.name()];

            if (!experiment.isValidVariant(variantName)) {
                const variant = experiment.chooseRandomVariant();
                if (variant) {
                    this._variantMap[experiment.name()] = variant.name();
                }
            }
        }

        return this;
    }

    // private

    __onConfigurationDone() {
        this._variantMap = {};
    }

    __storageGetObject(key, storage) {
        storage = storage || window.localStorage;
        const data = storage.getItem(key);
        return (data) ? JSON.parse(data) : {};
    }

    __storageSetObject(key, value, storage) {
        storage = storage || window.localStorage;
        const data = JSON.stringify(value || {});
        storage.setItem(key, data);
    }

};

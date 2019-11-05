import { AbExperimentDeclaration } from "./AbExperimentDeclaration";
import { AbVariantDeclaration } from "./AbVariantDeclaration";

export class AbConfiguration {
    constructor() {
        this.__clear();
    }

    done() {
        console.assert(this._instance);
        this._instance.__onConfigurationDone();
        this._instance = undefined;
    }

    addExperiment(name) {
        var experiment = new AbExperimentDeclaration(name);
        this._experiments.push(experiment);
        this._currentExperiment = experiment;
        this._currentVariant = undefined;
        return this;
    }

    addVariant(name) {
        if (this._currentExperiment) {
            var variant = new AbVariantDeclaration(name);
            this._currentVariant = variant;
            this._currentExperiment.addVariant(variant);
        }
        return this;
    }

    weighing(weight) {
        if (this._currentVariant) {
            this._currentVariant.setWeight(weight);
        }
        return this;
    }

    sticking() {
        if (this._currentVariant) {
            this._currentVariant.makeSticky();
        }
        return this;
    }

    experiments() {
        return this._experiments;
    }

    // private

    __clear() {
        this._instance = undefined;
        this._experiments = [];
        this._currentExperiment = undefined;
        this._currentVariant = undefined;
    }

    __start(instance) {
        console.assert(!this._instance);
        this.__clear();
        this._instance = instance;
    }
}

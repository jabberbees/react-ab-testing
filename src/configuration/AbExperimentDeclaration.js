export class AbExperimentDeclaration {
    constructor(name) {
        this._name = name;
        this._variants = [];
    }

    addVariant(variant) {
        this._variants.push(variant);
    }

    name() {
        return this._name;
    }

    variants() {
        return this._variants;
    }

    chooseRandomVariant(randomValue) {
        var total = 0;
        for (var i = 0; i < this._variants.length; i++) {
            const variant = this._variants[i];
            if (variant.sticky()) {
                return variant;
            }
            total += variant.weight();
        }

        let w = (randomValue === undefined ? Math.random() : randomValue)
            * total;

        for (var i = 0; i < this._variants.length; i++) {
            const variant = this._variants[i];

            if (w < variant.weight()) {
                return variant;
            }

            w -= variant.weight();
        }

        return this._variants[0];
    }
}

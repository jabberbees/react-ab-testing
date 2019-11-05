export class AbVariantDeclaration {
    constructor(name) {
        this._name = name;
        this._weight = 1;
        this._sticky = false;
    }

    name() {
        return this._name;
    }

    weight() {
        return this._weight;
    }

    setWeight(weight) {
        this._weight = weight;
    }

    sticky() {
        return this._sticky;
    }

    makeSticky() {
        this._sticky = true;
    }
}

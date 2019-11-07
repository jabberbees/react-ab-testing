export class AbVariantDeclaration {
    constructor(name) {
        this._name = name;
        this._weight = 1;
        this._forced = false;
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

    forced() {
        return this._forced;
    }

    force() {
        this._forced = true;
    }
}

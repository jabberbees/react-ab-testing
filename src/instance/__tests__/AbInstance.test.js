import { AbInstance } from '../AbInstance';

class LocalStorageStub {
    constructor() {
        this.items = {};
    }

    getItem(key) {
        return this.items[key] || null;
    }

    setItem(key, value) {
        this.items[key] = value;
    }

    removeItem(key) {
        delete this.items[key];
    }
};

var instance;
var storage;

beforeEach(() => {
    instance = new AbInstance();
    storage = new LocalStorageStub();
});

test('configuration is defined', () => {
    expect(instance.configure()).toBeDefined();
});

test('configure does not reset variant map', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done()
        .randomiseVariants()
        .configure();

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v1",
        "bar": "bar.v1"
    });
});

test('configure resets configuration', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done()
        .randomiseVariants()
        .configure();

    expect(instance.configuration().experiments()).toEqual([]);
});

test('done resets variants map', () => {
    instance
        .setVariantMap({ "foo": "foo.v1", "bar": "bar.v1" })
        .configure()
        .done();

    expect(instance.variantMap()).toEqual({});
});

test('clearVariantMap clears variant map', () => {
    instance
        .setVariantMap({ "foo": "foo.v1", "bar": "bar.v1" })
        .clearVariantMap();

    expect(instance.variantMap()).toEqual({});
});

test('setVariantMap sets variant map', () => {
    instance
        .setVariantMap({ "foo": "foo.v1", "bar": "bar.v1" });

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v1",
        "bar": "bar.v1"
    });
});

test('loadVariantMap defaults to empty map', () => {
    instance.configure()
        .done()
        .loadVariantMap("variant-map", storage);

    expect(instance.variantMap()).toEqual({});
});

test('loadVariantMap loads variant map', () => {
    const map = {
        "foo": "foo.v1",
        "bar": "bar.v1"
    };
    storage.setItem("variant-map", JSON.stringify(map));
    instance.configure()
        .done()
        .loadVariantMap("variant-map", storage);

    expect(instance.variantMap()).toEqual(map);
});

test('loadVariantMap takes forced variants into account', () => {
    const map = {
        "foo": "foo.v1",
        "bar": "bar.v1"
    };
    storage.setItem("variant-map", JSON.stringify(map));
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addVariant("foo.v2").forced()
        .addExperiment("bar")
        .addVariant("bar.v1")
        .addVariant("bar.v2").forced()
        .done()
        .loadVariantMap("variant-map", storage);

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v2",
        "bar": "bar.v2"
    });
});

test('saveVariantMap saves variant map to storage', () => {
    const map = {
        "foo": "foo.v1",
        "bar": "bar.v1"
    };
    storage.setItem("variant-map", JSON.stringify(map));
    instance.configure()
        .done()
        .loadVariantMap("variant-map", storage)
        .saveVariantMap("variant-map-2", storage);
    expect(storage.getItem("variant-map-2")).toEqual(JSON.stringify(map));
});

test('removeSavedVariantMap removes variant map from storage', () => {
    const map = {
        "foo": "foo.v1",
        "bar": "bar.v1"
    };
    storage.setItem("variant-map", JSON.stringify(map));
    instance.configure()
        .done()
        .removeSavedVariantMap("variant-map", storage);
    expect(storage.getItem("variant-map")).toBeNull();
});

test('removeSavedVariantMap removes stored variant map', () => {
    const map = {
        "foo": "foo.v1",
        "bar": "bar.v1"
    };
    storage.setItem("variant-map", JSON.stringify(map));
    instance.configure()
        .done()
        .removeSavedVariantMap("variant-map", storage);

    expect(storage.items).toEqual({});
});

test('randomiseVariants initialises variants map', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done()
        .randomiseVariants();

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v1",
        "bar": "bar.v1"
    });
});

test('randomiseVariants initialises unmapped variants', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done()
        .randomiseVariants();

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v1",
        "bar": "bar.v1"
    });
});

test('randomiseVariants leaves mapped variants', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addVariant("foo.v2").forced()
        .addExperiment("bar")
        .addVariant("bar.v1")
        .addVariant("bar.v2").forced()
        .done()
        .setVariantMap({ "foo": "foo.v1", "bar": "bar.v1" })
        .randomiseVariants();

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v1",
        "bar": "bar.v1"
    });
});

test('randomiseVariants initialises inexistent variants', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addVariant("foo.v2").forced()
        .addExperiment("bar")
        .addVariant("bar.v1")
        .addVariant("bar.v2").forced()
        .done()
        .setVariantMap({ "foo": "foo.v0", "bar": "bar.v0" })
        .randomiseVariants();

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v2",
        "bar": "bar.v2"
    });
});

test('activeVariant returns empty string for unknown experiments', () => {
    instance.configure().done();

    expect(instance.activeVariant("foo")).toBe("");
});

test('variantMap returns empty object', () => {
    instance.configure().done();

    expect(instance.variantMap()).toEqual({});
});

test('variantMap returns object as experiment to active variant map', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done()
        .randomiseVariants();

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v1",
        "bar": "bar.v1"
    });
});

import { AbInstance } from '../AbInstance';

var instance;

beforeEach(() => {
    instance = new AbInstance();
});

test('configuration is defined', () => {
    expect(instance.configure()).toBeDefined();
});

test('done initialises variants', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done();

    expect(instance.activeVariant("foo")).toBe("foo.v1");
    expect(instance.activeVariant("bar")).toBe("bar.v1");
});

test('configure does not reset variants', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done();
    
    instance.configure();

    expect(instance.activeVariant("foo")).toBe("foo.v1");
    expect(instance.activeVariant("bar")).toBe("bar.v1");
});

test('configure resets configuration', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done();
 
    instance.configure();

    expect(instance.configuration().experiments()).toEqual([]);
});

test('done resets variants', () => {
    instance.configure()
        .addExperiment("foo")
        .addVariant("foo.v1")
        .addExperiment("bar")
        .addVariant("bar.v1")
        .done();
 
    instance.configure().done();

    expect(instance.activeVariant("foo")).toBe("");
    expect(instance.activeVariant("bar")).toBe("");
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
        .done();

    expect(instance.variantMap()).toEqual({
        "foo": "foo.v1",
        "bar": "bar.v1"
    });
});

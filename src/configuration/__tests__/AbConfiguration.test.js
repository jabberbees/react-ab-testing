import { AbConfiguration } from '../AbConfiguration';

var configuration;

beforeEach(() => {
	configuration = new AbConfiguration();
});

test('addExperiment returns this', () => {
	expect(configuration.addExperiment("foo"))
		.toBe(configuration);
});

test('addExperiment adds experiment', () => {
	configuration
		.addExperiment("foo");

	const experiments = configuration.experiments();

	expect(experiments.length).toBe(1);
	expect(experiments[0].name()).toBe("foo");
});

test('addExperiment can be called multiple times', () => {
	configuration
		.addExperiment("foo")
		.addExperiment("bar");

	const experiments = configuration.experiments();
	expect(experiments.length).toBe(2);
	expect(experiments[0].name()).toBe("foo");
	expect(experiments[1].name()).toBe("bar");
});

test('addVariant returns this', () => {
	expect(configuration.addExperiment("foo").addVariant("v1"))
		.toBe(configuration);
});

test('addVariant adds variant to experiment', () => {
	configuration
		.addExperiment("foo")
		.addVariant("v1");

	const experiments = configuration.experiments();

	const variants = experiments[0].variants();

	expect(variants.length).toBe(1);
	expect(variants[0].name()).toBe("v1");
});

test('addVariant adds variant with default weight of 1', () => {
	configuration
		.addExperiment("foo")
		.addVariant("v1");

	const experiments = configuration.experiments();

	const variants = experiments[0].variants();

	expect(variants.length).toBe(1);
	expect(variants[0].weight()).toBe(1);
});

test('weighing alters the last declared variant\'s weight', () => {
	configuration
		.addExperiment("foo")
		.addVariant("v1")
		.weighing(2);

	const experiments = configuration.experiments();

	const variants = experiments[0].variants();

	expect(variants.length).toBe(1);
	expect(variants[0].weight()).toBe(2);
});

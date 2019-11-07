import { AbExperimentDeclaration } from "../AbExperimentDeclaration";
import { AbVariantDeclaration } from "../AbVariantDeclaration";

test('addVariant adds variant', () => {
	var experiment = new AbExperimentDeclaration("foo");
	var variant = new AbVariantDeclaration("one");
	experiment.addVariant(variant);
	expect(experiment.variants()).toContain(variant);
});

test('variantByName returns true', () => {
	var experiment = new AbExperimentDeclaration("foo");

	const a = new AbVariantDeclaration("one");
	const b = new AbVariantDeclaration("two");
	const c = new AbVariantDeclaration("three");
	const d = new AbVariantDeclaration("four");

	experiment.addVariant(a);
	experiment.addVariant(b);
	experiment.addVariant(c);
	experiment.addVariant(d);

	expect(experiment.variantByName("one")).toBe(a);
	expect(experiment.variantByName("two")).toBe(b);
	expect(experiment.variantByName("three")).toBe(c);
	expect(experiment.variantByName("four")).toBe(d);
});

test('variantByName returns undefined', () => {
	var experiment = new AbExperimentDeclaration("foo");

	expect(experiment.variantByName("one")).toBe(undefined);
	expect(experiment.variantByName("two")).toBe(undefined);
	expect(experiment.variantByName("three")).toBe(undefined);
	expect(experiment.variantByName("four")).toBe(undefined);
});

test('isValidVariant returns true', () => {
	var experiment = new AbExperimentDeclaration("foo");

	const a = new AbVariantDeclaration("one");
	const b = new AbVariantDeclaration("two");
	const c = new AbVariantDeclaration("three");
	const d = new AbVariantDeclaration("four");

	experiment.addVariant(a);
	experiment.addVariant(b);
	experiment.addVariant(c);
	experiment.addVariant(d);

	expect(experiment.isValidVariant("one")).toBe(true);
	expect(experiment.isValidVariant("two")).toBe(true);
	expect(experiment.isValidVariant("three")).toBe(true);
	expect(experiment.isValidVariant("four")).toBe(true);
});

test('isValidVariant returns false', () => {
	var experiment = new AbExperimentDeclaration("foo");

	expect(experiment.isValidVariant("one")).toBe(false);
	expect(experiment.isValidVariant("two")).toBe(false);
	expect(experiment.isValidVariant("three")).toBe(false);
	expect(experiment.isValidVariant("four")).toBe(false);
});

test('forcedVariant returns first forced variant', () => {
	var experiment = new AbExperimentDeclaration("foo");

	const a = new AbVariantDeclaration("one");
	const b = new AbVariantDeclaration("two");
	const c = new AbVariantDeclaration("three");
	const d = new AbVariantDeclaration("four");

	b.force();
	c.force();
	d.force();

	experiment.addVariant(a);
	experiment.addVariant(b);
	experiment.addVariant(c);
	experiment.addVariant(d);

	expect(experiment.forcedVariant()).toBe(b);
});

test('chooseRandomVariant returns undefined', () => {
	var experiment = new AbExperimentDeclaration("foo");

	expect(experiment.chooseRandomVariant()).toEqual(undefined);
});

test('chooseRandomVariant works', () => {
	var experiment = new AbExperimentDeclaration("foo");

	const a = new AbVariantDeclaration("one");
	const b = new AbVariantDeclaration("two");
	const c = new AbVariantDeclaration("three");
	const d = new AbVariantDeclaration("four");

	experiment.addVariant(a);
	experiment.addVariant(b);
	experiment.addVariant(c);
	experiment.addVariant(d);

	expect(experiment.chooseRandomVariant(0.00)).toBe(a);
	expect(experiment.chooseRandomVariant(0.25)).toBe(b);
	expect(experiment.chooseRandomVariant(0.50)).toBe(c);
	expect(experiment.chooseRandomVariant(0.75)).toBe(d);
});

test('chooseRandomVariant chooses first forced variant', () => {
	var experiment = new AbExperimentDeclaration("foo");

	const a = new AbVariantDeclaration("one");
	const b = new AbVariantDeclaration("two");
	const c = new AbVariantDeclaration("three");
	const d = new AbVariantDeclaration("four");

	a.force();
	b.force();
	c.force();
	d.force();

	experiment.addVariant(a);
	experiment.addVariant(b);
	experiment.addVariant(c);
	experiment.addVariant(d);

	expect(experiment.chooseRandomVariant(0.00)).toBe(a);
	expect(experiment.chooseRandomVariant(0.25)).toBe(a);
	expect(experiment.chooseRandomVariant(0.50)).toBe(a);
	expect(experiment.chooseRandomVariant(0.75)).toBe(a);
});

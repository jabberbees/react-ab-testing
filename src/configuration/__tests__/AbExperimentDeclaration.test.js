import { AbExperimentDeclaration } from "../AbExperimentDeclaration";
import { AbVariantDeclaration } from "../AbVariantDeclaration";

test('addVariant adds variant', () => {
	var experiment = new AbExperimentDeclaration("foo");
	var variant = new AbVariantDeclaration("one");
	experiment.addVariant(variant);
	expect(experiment.variants()).toContain(variant);
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

test('chooseRandomVariant chooses first sticky variant', () => {
	var experiment = new AbExperimentDeclaration("foo");

	const a = new AbVariantDeclaration("one");
	const b = new AbVariantDeclaration("two");
	const c = new AbVariantDeclaration("three");
	const d = new AbVariantDeclaration("four");

	a.makeSticky();
	b.makeSticky();
	c.makeSticky();
	d.makeSticky();

	experiment.addVariant(a);
	experiment.addVariant(b);
	experiment.addVariant(c);
	experiment.addVariant(d);

	expect(experiment.chooseRandomVariant(0.00)).toBe(a);
	expect(experiment.chooseRandomVariant(0.25)).toBe(a);
	expect(experiment.chooseRandomVariant(0.50)).toBe(a);
	expect(experiment.chooseRandomVariant(0.75)).toBe(a);
});

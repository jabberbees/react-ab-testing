import { AbVariantDeclaration } from "../AbVariantDeclaration";

test('constructor sets name', () => {
	var variant = new AbVariantDeclaration("one");
	expect(variant.name()).toEqual("one");
});

test('constructor sets default values', () => {
	var variant = new AbVariantDeclaration("one");
	expect(variant.weight()).toEqual(1);
	expect(variant.forced()).toEqual(false);
});

test('force sets forced to true', () => {
	var variant = new AbVariantDeclaration("one");
	variant.force();
	expect(variant.forced()).toEqual(true);
});

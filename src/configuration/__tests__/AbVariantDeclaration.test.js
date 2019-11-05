import { AbVariantDeclaration } from "../AbVariantDeclaration";

test('constructor sets name', () => {
	var variant = new AbVariantDeclaration("one");
	expect(variant.name()).toEqual("one");
});

test('constructor sets default values', () => {
	var variant = new AbVariantDeclaration("one");
	expect(variant.weight()).toEqual(1);
	expect(variant.sticky()).toEqual(false);
});

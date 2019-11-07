import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { AbTestVariant } from '../AbTestVariant';
import { ab } from '../../index';

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

describe("AbTestVariant component", () => {

	test("shows inner HTML when experiment's variant is active", () => {
		ab.configure()
			.addExperiment('foo')
			.addVariant('bar')
			.done()
			.randomiseVariants();
		act(() => {
			render(
				<AbTestVariant experiment='foo' variant='bar'>
					<div>Hello world!</div>
				</AbTestVariant>
				, container);
		});
		expect(container.innerHTML).toBe("<div>Hello world!</div>");
	});

	test("hides inner HTML when experiment's variant is inactive", () => {
		ab.configure()
			.addExperiment('foo')
			.addVariant('bar')
			.done()
			.randomiseVariants();
		act(() => {
			render(
				<AbTestVariant experiment='foo' variant='notbar'>
					<div>Hello world!</div>
				</AbTestVariant>
				, container);
		});
		expect(container.innerHTML).toBe("");
	});

	test("shows inner HTML when forced is true", () => {
		act(() => {
			render(
				<AbTestVariant experiment='foo' variant='bar' forced={true}>
					<div>Hello world!</div>
				</AbTestVariant>
				, container);
		});
		expect(container.innerHTML).toBe("<div>Hello world!</div>");
	});

	test("hides inner HTML when visible is false", () => {
		ab.configure()
			.addExperiment('foo')
			.addVariant('bar')
			.done()
			.randomiseVariants();
		act(() => {
			render(
				<AbTestVariant experiment='foo' variant='bar' visible={false}>
					<div>Hello world!</div>
				</AbTestVariant>
				, container);
		});
		expect(container.innerHTML).toBe("");
	});

	test("hides inner HTML when visible is false even when forced", () => {
		ab.configure()
			.addExperiment('foo')
			.addVariant('bar')
			.done()
			.randomiseVariants();
		act(() => {
			render(
				<AbTestVariant experiment='foo' variant='bar' visible={false} forced={true}>
					<div>Hello world!</div>
				</AbTestVariant>
				, container);
		});
		expect(container.innerHTML).toBe("");
	});

});

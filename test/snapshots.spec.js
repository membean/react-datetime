/* global it, describe, expect, jest */

import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from '@testing-library/react';
import Datetime from '../DateTime.js';

// Mock date to get rid of time as a factor to make tests deterministic
Date.now = jest.fn(() => 1482363367071);

function renderSnapshot(element) {
	const { asFragment, unmount } = render(element);
	const fragment = asFragment();
	unmount();
	return fragment;
}

it('everything default: renders correctly', () => {
	expect(renderSnapshot(<Datetime />)).toMatchSnapshot();
});

it('value: set to arbitrary value', () => {
	expect(renderSnapshot(<Datetime defaultValue={Date.now()} />)).toMatchSnapshot();
});

it('defaultValue: set to arbitrary value', () => {
	expect(renderSnapshot(<Datetime defaultValue={Date.now()} />)).toMatchSnapshot();
});

describe('dateFormat', () => {
	it('set to true', () => {
		expect(renderSnapshot(<Datetime dateFormat={true} />)).toMatchSnapshot();
	});

	it('set to false', () => {
		expect(renderSnapshot(<Datetime dateFormat={false} />)).toMatchSnapshot();
	});
});

describe('timeFormat', () => {
	it('set to true', () => {
		expect(renderSnapshot(<Datetime timeFormat={true} />)).toMatchSnapshot();
	});

	it('set to false', () => {
		expect(renderSnapshot(<Datetime timeFormat={false} />)).toMatchSnapshot();
	});
});

describe('input', () => {
	it('input: set to true', () => {
		expect(renderSnapshot(<Datetime input={true} />)).toMatchSnapshot();
	});

	it('input: set to false', () => {
		expect(renderSnapshot(<Datetime input={false} />)).toMatchSnapshot();
	});
});

describe('open', () => {
	it('set to true', () => {
		expect(renderSnapshot(<Datetime open={true} />)).toMatchSnapshot();
	});

	it('set to false', () => {
		expect(renderSnapshot(<Datetime open={false} />)).toMatchSnapshot();
	});
});

describe('viewMode', () => {
	it('set to days', () => {
		expect(renderSnapshot(<Datetime viewMode={'days'} />)).toMatchSnapshot();
	});

	it('set to months', () => {
		expect(renderSnapshot(<Datetime viewMode={'months'} />)).toMatchSnapshot();
	});

	it('set to years', () => {
		expect(renderSnapshot(<Datetime viewMode={'years'} />)).toMatchSnapshot();
	});

	it('set to time', () => {
		expect(renderSnapshot(<Datetime viewMode={'time'} />)).toMatchSnapshot();
	});
});

it('className: set to arbitraty value', () => {
	expect(renderSnapshot(<Datetime className={'arbitrary-value'} />)).toMatchSnapshot();
});

describe('inputProps', () => {
	it('with placeholder specified', () => {
		expect(renderSnapshot(
			<Datetime inputProps={{ placeholder: 'arbitrary-placeholder' }} />
		)).toMatchSnapshot();
	});

	it('with disabled specified', () => {
		expect(renderSnapshot(
			<Datetime inputProps={{ disabled: true }} />
		)).toMatchSnapshot();
	});

	it('with required specified', () => {
		expect(renderSnapshot(
			<Datetime inputProps={{ required: true }} />
		)).toMatchSnapshot();
	});

	it('with name specified', () => {
		expect(renderSnapshot(
			<Datetime inputProps={{ name: 'arbitrary-name' }} />
		)).toMatchSnapshot();
	});

	it('with className specified', () => {
		expect(renderSnapshot(
			<Datetime inputProps={{ className: 'arbitrary-className' }} />
		)).toMatchSnapshot();
	});
});

it('isValidDate: only valid if after yesterday', () => {
	const yesterday = Datetime.moment().subtract(1, 'day');
	const valid = (current) => current.isAfter(yesterday);
	expect(renderSnapshot(<Datetime isValidDate={valid} />)).toMatchSnapshot();
});

it('renderDay: specified', () => {
	const renderDay = (props, currentDate) => <td {...props}>{ '0' + currentDate.date() }</td>;
	expect(renderSnapshot(<Datetime renderDay={renderDay} />)).toMatchSnapshot();
});

it('renderMonth: specified', () => {
	const renderMonth = (props, currentDate) => <td {...props}>{ '0' + currentDate.date() }</td>;
	expect(renderSnapshot(<Datetime renderMonth={renderMonth} />)).toMatchSnapshot();
});

it('renderYear: specified', () => {
	const renderYear = (props, currentDate) => <td {...props}>{ '0' + currentDate.date() }</td>;
	expect(renderSnapshot(<Datetime renderYear={renderYear} />)).toMatchSnapshot();
});

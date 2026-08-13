import React from 'react'; // eslint-disable-line no-unused-vars
import { render, fireEvent, act } from '@testing-library/react';
import Datetime from '../DateTime'; // eslint-disable-line no-unused-vars

function simulate(node, eventName, eventData) {
	if (!node) {
		// eslint-disable-next-line no-console
		console.warn('Element not clicked since it doesn\'t exist');
		return;
	}

	const eventMap = {
		click: () => fireEvent.click(node),
		focus: () => fireEvent.focus(node),
		blur: () => fireEvent.blur(node),
		mouseDown: () => fireEvent.mouseDown(node, eventData || {}),
		mouseUp: () => fireEvent.mouseUp(node, eventData || {}),
		keyDown: () => fireEvent.keyDown(node, eventData || {}),
		change: () => fireEvent.change(node, eventData || { target: { value: '' } }),
	};

	const runner = eventMap[eventName];
	if (!runner) {
		throw new Error('Unsupported simulate event: ' + eventName);
	}
	act(() => {
		runner();
	});
}

function createWrapper(nodes, rootApi) {
	const list = Array.prototype.slice.call(nodes || []);

	const api = {
		length: list.length,
		get: (index) => list[index],
		at: (index) => createWrapper(list[index] ? [list[index]] : [], rootApi),
		first: () => createWrapper(list[0] ? [list[0]] : [], rootApi),
		map: (fn) => list.map((node, index) => fn(createWrapper([node], rootApi), index)),
		text: () => list.map((node) => node.textContent || '').join(''),
		html: () => list.map((node) => node.innerHTML || '').join(''),
		hasClass: (className) => !!(list[0] && list[0].classList && list[0].classList.contains(className)),
		getDOMNode: () => list[0] || null,
		find: (selector) => {
			const found = [];
			list.forEach((node) => {
				if (node.matches && node.matches(selector)) {
					found.push(node);
				}
				if (node.querySelectorAll) {
					found.push.apply(found, node.querySelectorAll(selector));
				}
			});
			return createWrapper(found, rootApi);
		},
		simulate: (eventName, eventData) => {
			simulate(list[0], eventName, eventData);
			return rootApi;
		},
	};

	return api;
}

function createDatetime(props) {
	let currentProps = Object.assign({}, props);
	const result = render(<Datetime {...currentProps} />);

	const rootApi = {
		find: (selector) => createWrapper(result.container.querySelectorAll(selector), rootApi),
		html: () => result.container.innerHTML,
		update: () => {},
		setProps: (nextProps, callback) => {
			currentProps = Object.assign({}, currentProps, nextProps);
			act(() => {
				result.rerender(<Datetime {...currentProps} />);
			});
			if (typeof callback === 'function') {
				callback();
			}
			return rootApi;
		},
		unmount: () => result.unmount(),
	};

	return rootApi;
}

const _simulateClickOnElement = (element) => {
	if (!element || element.length === 0) {
		// eslint-disable-next-line no-console
		console.warn('Element not clicked since it doesn\'t exist');
		return;
	}
	return element.simulate('click');
};

module.exports = {
	createDatetime: createDatetime,

	// Full render is enough for these assertions under React 19
	createDatetimeShallow: createDatetime,

	/*
	 * Click Simulations
	 */
	openDatepicker: (datetime) => {
		datetime.find('.form-control').simulate('focus');
	},

	clickOnElement: (element) => {
		return _simulateClickOnElement(element);
	},

	clickNthDay: (datetime, n) => {
		return _simulateClickOnElement(datetime.find('.rdtDay').at(n));
	},

	clickNthMonth: (datetime, n) => {
		return _simulateClickOnElement(datetime.find('.rdtMonth').at(n));
	},

	clickNthYear: (datetime, n) => {
		return _simulateClickOnElement(datetime.find('.rdtYear').at(n));
	},

	/*
	 * Boolean Checks
	 */
	isOpen: (datetime) => {
		return datetime.find('.rdt.rdtOpen').length > 0;
	},

	isDayView: (datetime) => {
		return datetime.find('.rdtPicker .rdtDays').length > 0;
	},

	isMonthView: (datetime) => {
		return datetime.find('.rdtPicker .rdtMonths').length > 0;
	},

	isYearView: (datetime) => {
		return datetime.find('.rdtPicker .rdtYears').length > 0;
	},

	isTimeView: (datetime) => {
		return datetime.find('.rdtPicker .rdtTime').length > 0;
	},

	/*
	 * Change Time Values
	 *
	 * These functions only work when the time view is open
	 */
	increaseHour: (datetime) => {
		datetime.find('.rdtCounter .rdtBtn').at(0).simulate('mouseDown');
	},

	decreaseHour: (datetime) => {
		datetime.find('.rdtCounter .rdtBtn').at(1).simulate('mouseDown');
	},

	increaseMinute: (datetime) => {
		datetime.find('.rdtCounter .rdtBtn').at(2).simulate('mouseDown');
	},

	decreaseMinute: (datetime) => {
		datetime.find('.rdtCounter .rdtBtn').at(3).simulate('mouseDown');
	},

	increaseSecond: (datetime) => {
		datetime.find('.rdtCounter .rdtBtn').at(4).simulate('mouseDown');
	},

	decreaseSecond: (datetime) => {
		datetime.find('.rdtCounter .rdtBtn').at(5).simulate('mouseDown');
	},

	/*
	 * Get Values
	 */
	getNthDay: (datetime, n) => {
		return datetime.find('.rdtDay').at(n);
	},

	getNthMonth: (datetime, n) => {
		return datetime.find('.rdtMonth').at(n);
	},

	getNthYear: (datetime, n) => {
		return datetime.find('.rdtYear').at(n);
	},

	getHours: (datetime) => {
		return datetime.find('.rdtCount').at(0).text();
	},

	getMinutes: (datetime) => {
		return datetime.find('.rdtCount').at(1).text();
	},

	getSeconds: (datetime) => {
		return datetime.find('.rdtCount').at(2).text();
	},

	getInputValue: (datetime) => {
		return datetime.find('.rdt > .form-control').getDOMNode().value;
	},

	getViewDateValue: (datetime) => {
		return datetime.find('.rdtSwitch').getDOMNode().innerHTML;
	}
};

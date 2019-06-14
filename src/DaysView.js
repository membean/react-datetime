'use strict';

var React = require('react'),
	createClass = require('create-react-class'),
	moment = require('moment'),
	TimeView = require('./TimeView')
	;

var DateTimePickerDays = createClass({
	// render: function () {
	// 	console.log('hellllo');
	// 	var that = this;

	// 	var timePickerHeader = React.createElement('div', { className: 'react-datepicker-time__header' }, 'Time');

	// 	var timePicker = React.createElement('ul', {}, that.renderTimes());

	// 	var timePickerChildren = [
	// 		React.createElement('div', { className: 'react-datepicker__header--time' }, timePickerHeader),
	// 		React.createElement('div', { className: 'react-datepicker__time' }, timePicker)
	// 	];
	// 	return React.createElement('div', { className: 'timepicker_main' }, timePickerChildren);
	// },
	renderTimes: function () {
		var that = this;
		var times = [];
		var format = 'p';
		// var intervals = this.props.intervals;
		var activeTime = this.props.value || moment(moment(), this.props.displayTimezone);
		var currH = activeTime.format('h');
		var currM = activeTime.format('m');
		var base = activeTime.startOf('day');
		for (var i = 0; i < 24; i++) {
			var formattedTime;
			if (i === 0) {
				formattedTime = { hour: i, amPm: 'am' };
			} else if (i > 12) {
				formattedTime = { hour: i, amPm: 'pm' };
			} else {
				formattedTime = { hour: i, amPm: 'am' };
			}
			times.push(formattedTime);
		}

		return times.map(function (time, idx) {
			var formattedHour = time.hour;
			if (time.hour > 12) {
				formattedHour = time.hour - 12;
			} else if (time.hour === 0) {
				formattedHour = 12;
			}
			var timeString = formattedHour + ':00';
			return React.createElement('li', {
				key: idx, className: 'time-selector-time', onClick: function () {
					that.props.setTime(time);
				}, value: time.hour
			}, timeString);
		});
	},
	render: function () {
		var footer = this.renderFooter(),
			date = this.props.viewDate,
			locale = date.localeData(),
			tableChildren,
			timeSelector
			;

		tableChildren = [
			React.createElement('thead', { key: 'th' }, [
				React.createElement('tr', { key: 'h' }, [
					React.createElement('th', { key: 'p', className: 'rdtPrev', onClick: this.props.subtractTime(1, 'months') }, React.createElement('span', {}, '‹')),
					React.createElement('th', { key: 's', className: 'rdtSwitch', onClick: this.props.showView('months'), colSpan: 5, 'data-value': this.props.viewDate.month() }, locale.months(date) + ' ' + date.year()),
					React.createElement('th', { key: 'n', className: 'rdtNext', onClick: this.props.addTime(1, 'months') }, React.createElement('span', {}, '›'))
				]),
				React.createElement('tr', { key: 'd' }, this.getDaysOfWeek(locale).map(function (day, index) { return React.createElement('th', { key: day + index, className: 'dow' }, day); }))
			]),
			React.createElement('tbody', { key: 'tb' }, this.renderDays())
		];

		timeSelector = React.createElement('ul', { className: 'time-selector-times' }, this.renderTimes());

		if (footer)
			tableChildren.push(footer);

		return React.createElement('div', { className: 'rdtDays' },
			[React.createElement('table', { key: 'table' }, tableChildren), React.createElement('div', { className: 'time-selector-container', key: 'time-selector' }, this.props.showTimeSelector ? timeSelector : null)]
		);
	},

	/**
	 * Get a list of the days of the week
	 * depending on the current locale
	 * @return {array} A list with the shortname of the days
	 */
	getDaysOfWeek: function (locale) {
		var days = locale._weekdaysMin,
			first = locale.firstDayOfWeek(),
			dow = [],
			i = 0
			;

		days.forEach(function (day) {
			dow[(7 + (i++) - first) % 7] = day;
		});

		return dow;
	},

	renderDays: function () {
		var date = this.props.viewDate,
			selected = this.props.selectedDate && this.props.selectedDate.clone(),
			prevMonth = date.clone().subtract(1, 'months'),
			currentYear = date.year(),
			currentMonth = date.month(),
			weeks = [],
			days = [],
			renderer = this.props.renderDay || this.renderDay,
			isValid = this.props.isValidDate || this.alwaysValidDate,
			classes, isDisabled, dayProps, currentDate
			;

		// Go to the last week of the previous month
		prevMonth.date(prevMonth.daysInMonth()).startOf('week');
		var lastDay = prevMonth.clone().add(42, 'd');

		while (prevMonth.isBefore(lastDay)) {
			classes = 'rdtDay';
			currentDate = prevMonth.clone();

			if ((prevMonth.year() === currentYear && prevMonth.month() < currentMonth) || (prevMonth.year() < currentYear))
				classes += ' rdtOld';
			else if ((prevMonth.year() === currentYear && prevMonth.month() > currentMonth) || (prevMonth.year() > currentYear))
				classes += ' rdtNew';

			if (selected && prevMonth.isSame(selected, 'day'))
				classes += ' rdtActive';

			if (prevMonth.isSame(moment(), 'day'))
				classes += ' rdtToday';

			isDisabled = !isValid(currentDate, selected);
			if (isDisabled)
				classes += ' rdtDisabled';

			dayProps = {
				key: prevMonth.format('M_D'),
				'data-value': prevMonth.date(),
				className: classes
			};

			if (!isDisabled)
				dayProps.onClick = this.updateSelectedDate;

			days.push(renderer(dayProps, currentDate, selected));

			if (days.length === 7) {
				weeks.push(React.createElement('tr', { key: prevMonth.format('M_D') }, days));
				days = [];
			}

			prevMonth.add(1, 'd');
		}

		return weeks;
	},

	updateSelectedDate: function (event) {
		this.props.updateSelectedDate(event, true);
	},

	renderDay: function (props, currentDate) {
		return React.createElement('td', props, currentDate.date());
	},

	renderFooter: function () {
		if (!this.props.timeFormat)
			return '';

		var date = this.props.selectedDate || this.props.viewDate;

		// return React.createElement('tfoot', { key: 'tf' },
		// 	React.createElement('tr', {},
		// 		React.createElement('td', { onClick: this.props.showView('time'), colSpan: 7, className: 'rdtTimeToggle' }, date.format(this.props.timeFormat))
		// 	)
		// );
		return null;
	},

	alwaysValidDate: function () {
		return 1;
	}
});

module.exports = DateTimePickerDays;

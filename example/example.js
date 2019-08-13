var DateTime = require('../DateTime.js');
var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');

ReactDOM.render(
  React.createElement(DateTime, {
	value: moment(),
	dateFormat: 'MMM D, YYYY',
	timeFormat: 'h:mm a',
	onChange: function (date) { 
		console.log('onChange called with the following date:', date.format());
	},
	closeOnSelect: true,
	showTimeSelector: true,
	displayTimeZone: 'America/Phoenix'
}),
  document.getElementById('datetime')
);

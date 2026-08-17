var DateTime = require("../DateTime.js");
var React = require("react");
var createClass = require("create-react-class");
var client = require("react-dom/client");
var moment = require("moment");

var Example = createClass({
	displayName: "Example",

	getInitialState: function () {
		return {
			value: moment(),
		};
	},

	onChange: function (date) {
		console.log("onChange called with the following date:", date && date.format ? date.format() : date);
		this.setState({ value: date });
	},

	render: function () {
		return React.createElement(DateTime, {
			value: this.state.value,
			dateFormat: "MMM D, YYYY",
			timeFormat: "h:mm a",
			onChange: this.onChange,
			closeOnSelect: true,
			showTimeSelector: true,
			displayTimeZone: "America/Phoenix",
		});
	},
});

const container = document.getElementById("datetime");
const root = client.createRoot(container);
root.render(React.createElement(Example));

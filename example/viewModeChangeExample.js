var DateTime = require("../DateTime.js");
var React = require("react");
var client = require("react-dom/client");
var createClass = require("create-react-class");
var moment = require("moment");

var Wrapper = createClass({
  getInitialState: function () {
    return {
      viewMode: "time",
    };
  },

  updateView: function (format) {
    console.log("changing viewMode to days");
    this.setState({
      viewMode: "days",
    });
  },

  componentDidMount: function () {
    setTimeout(this.updateView, 3000);
  },

  render: function () {
    console.log("Current viewmode: " + this.state.viewMode);
    return React.createElement(DateTime, {
      viewMode: this.state.viewMode,
      defaultValue: moment(),
    });
  },
});

const container = document.getElementById("datetime");
const root = client.createRoot(container);
root.render(React.createElement(Wrapper));

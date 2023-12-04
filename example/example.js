var DateTime = require("../DateTime.js");
var React = require("react");
var client = require("react-dom/client");
var moment = require("moment");

const container = document.getElementById("datetime");
const root = client.createRoot(container);
root.render(
  React.createElement(DateTime, {
    value: moment(),
    dateFormat: "MMM D, YYYY",
    timeFormat: "h:mm a",
    onChange: function (date) {
      console.log("onChange called with the following date:", date.format());
    },
    closeOnSelect: true,
    showTimeSelector: true,
    displayTimeZone: "America/Phoenix",
  })
);

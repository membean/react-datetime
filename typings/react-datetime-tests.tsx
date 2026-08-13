import * as React from "react";
import moment = require("moment");
import { Moment } from "moment";
import ReactDatetime = require("react-datetime");

/*
 Test the datetime picker.
 */

const TEST_BASIC_USAGE: React.ReactElement = <ReactDatetime />;

/*
 Test date properties
 */

const TEST_DATE_PROPS_FOR_VALUE: React.ReactElement = <ReactDatetime
		value={ new Date() }
	/>;

const TEST_DATE_PROPS_FOR_DEFAULT_VALUE: React.ReactElement = <ReactDatetime
		defaultValue={ new Date() }
	/>;

const TEST_DATE_PROPS_FOR_VALUE_AS_MOMENT: React.ReactElement = <ReactDatetime
		value={ moment() }
	/>;

const TEST_DATE_PROPS_FOR_VALUE_AS_STRING: React.ReactElement = <ReactDatetime
		value={ '1995-12-25' }
	/>;

const TEST_DATE_PROPS_FOR_DEFAULT_VALUE_AS_MOMENT: React.ReactElement = <ReactDatetime
		defaultValue={ moment() }
	/>;

const TEST_DATE_PROPS_FOR_DEFAULT_VALUE_AS_STRING: React.ReactElement = <ReactDatetime
		defaultValue={ '1995-12-25' }
	/>;

/*
 Test formats
 */

const TEST_FORMAT_PROPS_AS_STRINGS: React.ReactElement = <ReactDatetime
		dateFormat='mm/dd/yyyy'
		timeFormat='hh:mm:ss'
	/>;

const TEST_FORMAT_PROPS_AS_BOOLEANS: React.ReactElement = <ReactDatetime
		dateFormat={ false }
		timeFormat={ false }
	/>;

/*
 Test boolean options
 */

const TEST_BOOLEAN_PROPS: React.ReactElement = <ReactDatetime
		input={ false }
		open={ false }
		strictParsing={ false }
		closeOnSelect={ false }
		disableOnClickOutside={ false }
		utc={ false }
	/>;

/*
 Test locale options
 */

const TEST_LOCALE_PROPS: React.ReactElement = <ReactDatetime
		locale='en-us'
	/>;

/*
 Test input props
 */

const TEST_INPUT_PROPS: React.ReactElement = <ReactDatetime
		inputProps={
			{
				'placeholder': 'mm/dd/yyyy'
			}
		}
	/>;

/*
 Test Event handlers
 */

 const TEST_EVENT_HANDLERS_WITH_STRINGS: React.ReactElement = <ReactDatetime
 		onChange={
 			(momentOrInputString:string) => {}
 		}
		onFocus={
			() => {}
		}
		onBlur={
			(momentOrInputString:string) => {}
		}
		onViewModeChange={
 			(viewMode:string) => {}
 		}
 	/>;

const TEST_EVENT_HANDLERS_WITH_MOMENT: React.ReactElement = <ReactDatetime
		onChange={
			(momentOrInputString:Moment) => {}
		}
		onBlur={
			(momentOrInputString:Moment) => {}
		}
	/>;

/*
 Test view mode and className
 */

const TEST_VIEW_MODE_AND_CLASS_PROPS: React.ReactElement = <ReactDatetime
		viewMode='days'
		className='rdt'
	/>;

/*
 Test date validator
 */

const TEST_DATE_VALIDATOR_PROP: React.ReactElement = <ReactDatetime
		isValidDate={ (currentDate:any, selectedDate:any) => {
			return true;
		} }
	/>;

/*
 Test customizable components
 */

const TEST_CUSTOMIZABLE_COMPONENT_PROPS: React.ReactElement = <ReactDatetime
		renderDay={ (props: any, currentDate: any, selectedDate: any) => {
			return <td {...props}>{ '0' + currentDate.date() }</td>;
		} }
		renderMonth={ (props: any, month: any, year: any, selectedDate: any) => {
			return <td {...props}>{ month }</td>;
		} }
		renderYear={ (props: any, year: any, selectedDate: any) => {
			return <td {...props}>{ year % 100 }</td>;
		} }
	/>;

/*
 Test time constraints.
 */

const TEST_BASIC_TIME_CONSTRAINTS: React.ReactElement = <ReactDatetime
		timeConstraints={ {} }
	/>;

const TEST_TIME_CONSTRAINTS_WITH_ONE: React.ReactElement = <ReactDatetime
		timeConstraints={ {
			'hours': {
				'min': 0,
				'max': 23,
				'step': 1
			}
		} }
	/>;

const TEST_TIME_CONSTRAINTS_WITH_ALL: React.ReactElement = <ReactDatetime
		timeConstraints={ {
			'hours': {
				'min': 0,
				'max': 23,
				'step': 1
			},
			'minutes': {
				'min': 0,
				'max': 59,
				'step': 1
			},
			'seconds': {
				'min': 0,
				'max': 59,
				'step': 1,
			},
			'milliseconds': {
				'min': 0,
				'max': 999,
				'step': 1
			}
		} }
	/>;

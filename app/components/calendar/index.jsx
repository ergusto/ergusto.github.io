import React from 'react';
import Calendar from '../../lib/calendar.js';

import CalendarComponent from './calendar.jsx';
import CalendarDetailComponent from './detail.jsx';

import TabbedStateBehaviour from '../../behaviours/tabs.js';
import ActiveModelStateBehaviour from '../../behaviours/active.model.js';

// import styles for this component
require('!style!css!sass!./styles/calendar.scss');

export default class CalendarManagerComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.calendar = new Calendar();
		this.month = this.calendar.getMonth();
		this.state = {};
		this.tabs = new TabbedStateBehaviour(this, 'calendar');
		this.activeDay = new ActiveModelStateBehaviour(this);

		props.diary.onChange(() => {
			this.forceUpdate()
		});
	}

	setActiveDay(day) {
		this.activeDay.set(day);
		this.tabs.open('detail');
	}

	clearActiveDay() {
		this.activeDay.clear();
		this.showCalendar();
	}

	componentWillMount() {
		this.setState({month: this.month});
	}

	renderForDate(date) {
		const month = this.calendar.getMonth(date);
		this.setMonth(month);
	}

	showCalendar() {
		this.tabs.open('calendar');
	}

	setMonth(month) {
		this.setState({month: month});
	}

	render() {
		let content;
		let day;

		if (this.tabs.isOpen('calendar')) {
			content = <CalendarComponent 
						calendar={this.calendar}
						month={this.state.month}
						setMonth={this.setMonth.bind(this)}
						setActiveDay={this.setActiveDay.bind(this)}
						diary={this.props.diary}
					/>
		}

		if (this.tabs.isOpen('detail')) {
			day = this.activeDay.current;
			const entry = this.props.diary.getItemFromDateIdentifier(day.identifier);
			content = <CalendarDetailComponent
						diary={this.props.diary}
						day={day} 
						entry={entry}
						showCalendar={this.showCalendar.bind(this)}
					/>
		}

		return (

			<section className="calendar-example full-height padding justify-centre">

				<div id="calendar-example" className="example">

					{content}

				</div>

			</section>
		)
	}
}
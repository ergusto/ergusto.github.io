import React from 'react';

export default class CalendarItemComponent extends React.Component {

	setActiveDay(day, event) {
		event.preventDefault();
		this.props.setActiveDay(day);
	}

	render() {
		let classes = 'calendar-day padding-sm';
		const day = this.props.day;
		if (day.isToday) {
			classes = classes + ' isToday';
		}
		return (
			<li onClick={this.setActiveDay.bind(this, day)} className={classes}>
				{day.date}
			</li>
		)
	}

}
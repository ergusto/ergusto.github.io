import React from 'react';

import Tools from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/item.scss');

export default class CalendarItemComponent extends React.Component {

	constructor() {
		super();
	}

	setActiveDay(day, event) {
		event.preventDefault();
		this.props.setActiveDay(day);
	}

	render() {
		let entryTextHtml;
		let entrylist;
		let classes = 'calendar-day padding-sm';
		const day = this.props.day;
		if (day.isToday) {
			classes = classes + ' isToday';
		}
		const entry = this.props.diary.getItemFromDateIdentifier(day.identifier);
		if (entry && entry.identifier) {

			entryTextHtml = entry.entries.map((entry, index) => {
				if (index <= 2) {
					return <li className="calendar-item-entry"><small>{Tools.truncate(entry.title, 17)}</small></li>;
				}
				if (index == 3) {
					return <li className="calendar-item-entry">...</li>;
				}
			});

			entrylist = <ul className="calendar-item-entry-list">{entryTextHtml}</ul>;
		}
		return (
			<li onClick={this.setActiveDay.bind(this, day)} className={classes}>
				<span className="calendar-item-date">{day.date}</span>
				{entrylist}
			</li>
		)
	}

}
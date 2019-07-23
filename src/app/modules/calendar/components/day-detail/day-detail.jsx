import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import posed, { PoseGroup } from 'react-pose';
import { getHourDigit } from 'app/lib';
import { CalendarContext } from '../../context.jsx';
import HourItem from '../hour-item/hour-item.jsx';
import EntryForm from '../entry-form/entry-form.jsx'; 

import './day-detail.scss';

const EntryFormModal = posed.div({
	enter: { opacity: 1  },
	exit: { opacity: 0 }
});

export default function DayDetail({ day, close }) {
	const { calendar, state } = useContext(CalendarContext);

	const dayEntries = state.entries.filter(entry => entry.dayIdentifier === day.identifier);

	const [startHour, setStartHour] = useState(null);
	const [endHour, setEndHour] = useState(null);
	const [hoverHour, setHoverHour] = useState(null);
	const [showEntryForm, setShowEntryForm] = useState(false);

	const clearSelection = () => [setShowEntryForm, setStartHour, setEndHour, setHoverHour].forEach(fn => fn.call(null, null));
	const onCloseClick = () => close();
	const setHoveredHour = hour => setHoverHour(hour);
	const unsetHoveredHour = () => setHoverHour(null);

	const onEntryFormSubmit = values => clearSelection();

	const setHour = hour => {
		if(!startHour) {
			setStartHour(hour);

			if(!hoverHour) {
				setHoverHour(hour);
			}
		} else {
			const startDigit = getHourDigit(startHour),
				hourDigit = getHourDigit(hour);

			if(endHour) {
				if(hourDigit < startDigit) {
					setStartHour(hour);
					setEndHour(startHour);
				} else {
					setEndHour(hour);
				}
			} else {
				if(hourDigit < startDigit) {
					setStartHour(hour);
					setEndHour(startHour);
				} else {
					setEndHour(hour);
				}
			}
			
			setShowEntryForm(true);
		}
	};

	return (
		<div className='day-detail height-100 relative'>
			<header className='day-detail-header padding-top-small padding-bottom absolute top left right'>
				<button onClick={onCloseClick} className='day-detail-close line-height-header absolute cursor-pointer inline-block no-decoration padding-top-small padding-horizontal font-size-large color-dark-blue color-blue--on-hover font-weight-bold'>
					<FontAwesomeIcon icon='times' />
				</button>
				<h3 className='line-height-header color-dark-blue font-weight-semi-bold width-100 text-align-center'>{day.date} {day.month} {day.year}</h3>
			</header>
			<div className='day-detail-body-wrapper height-100 relative'>
				<div className='day-detail-body padding-all height-100 overflow-y-scroll'>
					<ul className='relative'>
						{calendar.hours.map(hour => {
							let hourEntries;

							if(dayEntries.length) {
								hourEntries = dayEntries.filter(entry => entry.startTime === hour);
							}

							return (
								<HourItem
									key={hour}
									hour={hour} 
									setHour={setHour} 
									startHour={startHour} 
									endHour={endHour} 
									hoveredHour={hoverHour} 
									setHoveredHour={setHoveredHour} 
									unsetHoveredHour={unsetHoveredHour} 
									clearSelection={clearSelection} 
									entries={hourEntries}
								/>
							);
						})}
					</ul>
				</div>
				<PoseGroup flipMove={false}>
					{showEntryForm ? (
						<EntryFormModal key='entry-form-modal'>
							<EntryForm 
								day={day}
								onCancel={clearSelection}  
								onSubmit={onEntryFormSubmit}
								startHour={startHour}
								setStartHour={setStartHour}
								endHour={endHour}
								setEndHour={setEndHour}
							/>
						</EntryFormModal> 
					) : null}
				</PoseGroup>
			</div>
		</div>
	);
}

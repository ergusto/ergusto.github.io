import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { getHourDigit } from 'app/lib';
import { CalendarContext } from '../../state/context.jsx';
import { ENTRY_CREATE } from '../../state/actionTypes.js';
import { FieldComponent, TextareaComponent, SelectComponent } from '../../form';

import './entry-form.scss';

const EntrySchema = Yup.object().shape({
	title: Yup.string().required('required').max(80),
	description: Yup.string().max(1200),
});

const FormComponent = ({ entry, day, onCancel, startHour, setStartHour, endHour, setEndHour, errors, touched, isSubmitting, setFieldValue, ...rest }) => {
	const { calendar } = useContext(CalendarContext);

	useEffect(() => {
		setFieldValue('startTime', startHour);	
	}, [startHour]);

	useEffect(() => {
		setFieldValue('endTime', endHour);	
	}, [endHour]);

	const onStartSelect = value => {
		const endDigit = getHourDigit(endHour),
			valueDigit = getHourDigit(value);

		if(valueDigit <= endDigit) {
			setStartHour(value);
		} else {
			setStartHour(endHour);
			setEndHour(value);
		}
	};

	const onEndSelect = value => {
		const startDigit = getHourDigit(startHour),
			valueDigit = getHourDigit(value);
	
		if(valueDigit >= startDigit) {
			setEndHour(value);
		} else {
			setStartHour(value);
			setEndHour(startHour);
		}
	};

	return (
		<Form autoComplete='off' className='calendar-form relative'>
			<div className='padding-all'>
				<div className='padding-bottom'>
					<Field component={FieldComponent} name='title' placeholder='Add Title' />
					<Field component={TextareaComponent} name='description' placeholder='Add Description' className='margin-top' />
					<div className='padding-top'>
						<Field onItemSelect={onStartSelect} items={calendar.hours} component={SelectComponent} name='startTime' />
						<span className='inline-block color-muted-grey font-weight-medium padding-horizontal-medium'>to</span>
						<Field onItemSelect={onEndSelect} items={calendar.hours} component={SelectComponent} name='endTime' />
					</div>
				</div>
				<footer className='clearfix'>
					<button type='submit' disabled={!isSubmitting && !!Object.keys(errors).length} className='button button--blue button--shift-on-hover button--shadow-on-hover float-right color-white'>Create event</button>
					{onCancel ? <button onClick={onCancel} type='button' className='button button--grey-ghost float-right font-weight-medium color-dark-grey margin-right-medium'>Cancel</button> : null}
				</footer>
			</div>
		</Form>
	);
};

export default function EntryForm({ entry, day, onSubmit: passedOnSubmit, onCancel, startHour, setStartHour, endHour, setEndHour }) {
	const { dispatch } = useContext(CalendarContext);

	const onSubmit = values => {
		dispatch({ type: ENTRY_CREATE, payload: { entry: values }});
		if(passedOnSubmit) passedOnSubmit(values);
	};

	if(!entry) {
		entry = {
			title: '',
			description: '',
			startTime: startHour,
			endTime: endHour,
			length: null,
			dayIdentifier: day.identifier
		};
	}

	return (
		<div className='entry-form-wrap justify-centre absolute top padding-vertical-3 z-index-1'>
			<div className='entry-form-container relative background-color-white padding-top-small box-shadow-modal border-radius'>
				<Formik
					initialValues={entry}
					validationSchema={EntrySchema}
					onSubmit={onSubmit}
					render={formProps => (
						<FormComponent 
							{...formProps} 	
							entry={entry}
							day={day}
							startHour={startHour}
							setStartHour={setStartHour}
							endHour={endHour}
							setEndHour={setEndHour}
							onCancel={onCancel}
						/>
					)}
				/>
			</div>
		</div>
	);
}

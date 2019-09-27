import React, { useState } from 'react';
import posed from 'react-pose';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { phoneNumberRegex } from '../../../../lib/lib.js';

import FieldComponent from '../form/field-component.jsx';

const AddressContainer = posed.div({
	closed: { height: 0 },
	open: { height: 'auto' }
});

const getContact = () => ({
	firstName: '',
	lastName: '',
	phoneNumber: '',
	email: '',
	address: {
		address: '',
		city: '',
		county: '',
		postcode: ''
	}
});

const ContactSchema = Yup.object().shape({
	firstName: Yup.string().required('required'),
	lastName: Yup.string().required('required'),
	phoneNumber: Yup.string().matches(phoneNumberRegex, 'Invalid phone number'),
	email: Yup.string().email('Invalid email address')
});

export default function ContactForm({ contact = getContact(), onSubmit, onCancel }) {
	const [showAddressFields, setShowAddressFields] = useState(false);

	return (
		<Formik
			initialValues={contact}
			validationSchema={ContactSchema}
			onSubmit={onSubmit}
			render={({ errors, touched, ...props }) => {
				const submitIsDisabled = Object.keys(touched).length ? !!Object.keys(errors).length : true;

				return (
					<Form autoComplete='off'>
						<div className='clearfix'>
							<div className='clearfix'>
								<Field component={FieldComponent} name='firstName' label='First name' halfWidth containerClassName='padding-right padding-bottom' />
								<Field component={FieldComponent} name='lastName' label='Last name' halfWidth containerClassName='padding-bottom' />
							</div>
							<div className='clearfix'>
								<Field component={FieldComponent} name='phoneNumber' label='Phone number' halfWidth containerClassName='padding-right' />
								<Field component={FieldComponent} name='email' label='Email address' halfWidth />
							</div>
						</div>
	 
						<AddressContainer pose={showAddressFields ? 'open' : 'closed'} className='overflow-hidden'>
							<h5 className='font-weight-bold color-muted-blue uppercase padding-bottom-medium padding-top'>Address</h5>
							<div className='clearfix'>
								<Field component={FieldComponent} name='address.address' label='Address' halfWidth containerClassName='padding-right padding-bottom' />
								<Field component={FieldComponent} name='address.city' label='City' halfWidth containerClassName='padding-bottom' />
							</div>
							<div className='clearfix'>
								<Field component={FieldComponent} name='address.county' label='County' halfWidth containerClassName='padding-right' />
								<Field component={FieldComponent} name='address.county' label='Postcode' halfWidth />
							</div>
						</AddressContainer>

						<footer className='padding-top'>
							<button disabled={submitIsDisabled} type='submit' className='button button--blue color-white font-size-medium'>Create contact</button>
							<button onClick={() => setShowAddressFields(!showAddressFields)} type='button' className='color-muted-blue font-size-small margin-left bold--on-hover'>
								{showAddressFields ? 'Remove address' : 'Add address'}
							</button>
						</footer>
					</Form>
				);
			}
		}
		/>
	);
}

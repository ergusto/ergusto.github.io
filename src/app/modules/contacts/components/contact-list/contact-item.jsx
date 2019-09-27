import React from 'react';
import { Link } from 'react-router-dom';

import './contact-item.scss';

export default function ContactItem({ contact }) {
	return (
		<li>
			<Link to={`/contacts/${contact.slug}`} className='contact-item font-size-medium font-weight-medium font-family-comfortaa color-muted-blue padding-all block no-underline no-outline'>
				{`${contact.firstName} ${contact.lastName}`}
			</Link>
		</li>
	);
}

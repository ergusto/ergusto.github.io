import React from 'react';
import { useMedia } from 'use-media';

import Item from './item.jsx';
import skills from '../skills.js';

export default function List() {
	const isTablet = useMedia({ maxWidth: 600 });

	const itemClass = `max-width-5 float-left ${isTablet ? 'width-100' : 'width-50'}`;

	return (
		<div className="max-width-14 block width-100">
			<ul>
				{skills.map(skill => {
					return (
						<li className={itemClass} key={skill.id}>
							<Item skill={skill} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
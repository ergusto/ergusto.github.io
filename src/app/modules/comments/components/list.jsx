import React, { useContext } from 'react';
import { CommentsContext } from '../context.jsx';

import Item from './item.jsx';

export default function List({ parentId = null }) {
	const { state: { comments } } = useContext(CommentsContext),
		items = comments.filter(obj => obj.parentId === parentId);

	if(!items.length) return null;

	return (
		<div className="max-width-9">
			<ul>
				{items.map(comment => {
					return (
						<li key={comment.id}>
							<div className="margin-bottom">
								<Item ListComponent={List} comment={comment} />
							</div>
							<div className="margin-left">
								<List parentId={comment.id} />
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
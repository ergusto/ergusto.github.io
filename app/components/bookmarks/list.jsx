import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class BookmarkListComponent extends React.Component {

	render() {
		const bookmarks = this.props.bookmarks.get();
		let content;

		if (bookmarks.length) {
			content = bookmarks.map((bookmark) => {
				return (
					<div key={bookmark.id} className="bookmark-item box margin-vertical padding">
						<p>{bookmark.title}</p>
						<p>{bookmark.url}</p>
					</div>
				);
			});
		} else {
			content = (
				<li>No bookmarks!</li>
			);
		}

		return (
			<ul className="bookmark-list">{content}</ul>
		);
	}

}
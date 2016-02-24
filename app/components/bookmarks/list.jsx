import React from 'react';
import BookmarkItemComponent from './item.jsx';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class BookmarkListComponent extends React.Component {

	render() {
		const bookmarks = this.props.bookmarks.get();
		let content;

		if (bookmarks.length) {
			content = bookmarks.map((bookmark) => {
				return (
					<BookmarkItemComponent key={bookmark.id} setActiveBookmark={this.props.setActiveBookmark} bookmark={bookmark} />
				);
			});
		} else {
			content = (
				<li className="box padding margin-vertical">No bookmarks!</li>
			);
		}

		return (
			<ul className="bookmark-list">{content}</ul>
		);
	}

}
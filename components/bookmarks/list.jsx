import React from 'react';
const PropTypes = React.PropTypes;

import BookmarkItemComponent from './item.jsx';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class BookmarkListComponent extends React.Component {

	render() {
		const { bookmarks, setActiveBookmark } = this.props;
		const bookmarkList = bookmarks.get();
		let content = <li className="box padding margin-vertical">No bookmarks!</li>;

		if (bookmarkList.length) {
			content = bookmarkList.map((bookmark) => {
				return <BookmarkItemComponent key={bookmark.id} setActiveBookmark={setActiveBookmark} bookmark={bookmark} />;
			});
		}

		return <ul className="bookmark-list">{content}</ul>;
	}

}

BookmarkListComponent.propTypes = {
	bookmarks: PropTypes.object.isRequired,
	setActiveBookmark: PropTypes.func.isRequired
};